import React, { useRef, useState } from "react";
import { Box, Button, Flex, Heading, useBreakpointValue, Divider, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CartItem from "./CartItem";
import RemoveModal from "./RemoveModal";
import CartHeader from "./CartHeader";
import CartEmptyView from "./CartEmptyView";
import { CartAction, CartActionType, useCartStore } from "../../context/cart";
import { VoucherSection } from "./VoucherSection";
import { calCartSubTotal, calDiscountAmt } from "../../utils/functions/price";
import LoadingScreen from "../../components/LoadingScreen";
import { QueryKeys } from "../../utils/constants/queryKeys";
import { api } from "../../services/api";
import { ProductType } from "../../typings/product";
import { CartItemType } from "../../typings/cart";
import Page from "../../components/Page";

export type ProductInfoType = {
  name: string;
  image: string;
  price: number;
};

export type ProductInfoMapType = Record<string, ProductInfoType>;

export const Cart: React.FC = () => {
  // Context hook.
  const cartContext = useCartStore();
  const { state: cartState, dispatch: cartDispatch } = cartContext;
  const [productInfo, setProductInfo] = useState<ProductInfoMapType>({});

  // Removal Modal cartStates
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toBeRemoved = useRef({ itemId: "", size: "" });

  // Check if break point hit.
  const isMobile: boolean = useBreakpointValue({ base: true, md: false }) || false;

  // Fetch and check if cart item is valid.
  const { isLoading } = useQuery([QueryKeys.PRODUCTS], () => api.getProducts(), {
    onSuccess: (data: ProductType[]) => {
      if (cartState.items.length === 0) {
        return;
      }
      const tempProductInfo: ProductInfoMapType = {};
      cartState.items.forEach((item: CartItemType) => {
        const product = data.find((i) => i.id === item.id);
        if (product && product.isAvailable) {
          tempProductInfo[product?.id] = {
            image: product?.images?.[0],
            price: product?.price,
            name: product.name,
          };
        } else {
          cartDispatch({ type: CartActionType.REMOVE_ITEM, payload: { id: item.id, size: item.size } });
        }
      });
      setProductInfo(tempProductInfo);
    },
  });

  // Calculate subtotal & discount amount.
  const subTotal = calCartSubTotal(cartState.items, productInfo);
  const discountAmt = calDiscountAmt(subTotal, cartState.voucherDetails);

  // Update Cart Item by Size & Id (To be changed next time: BE)
  const removeItem = (itemId: string, size: string) => {
    cartDispatch({
      type: CartActionType.REMOVE_ITEM,
      payload: { id: itemId, size },
    });
    onClose();
  };

  // Set modal's ref value to size & itemId pair.
  const handleRemoveItem = (itemId: string, size: string) => {
    onOpen();
    toBeRemoved.current.size = size;
    toBeRemoved.current.itemId = itemId;
  };
  // Update Cart Item by Size & Id (To be changed next time: BE)
  const onQuantityChange = (itemId: string, size: string, qty: number) => {
    const action: CartAction = {
      type: CartActionType.UPDATE_QUANTITY,
      payload: { id: itemId, size, quantity: qty },
    };
    cartDispatch(action);
  };

  const CartHeading = (
    <Heading textAlign="center" mb="12" size="xl">
      Shopping Cart
    </Heading>
  );

  const billBreakdown = (
    <>
      <Heading fontSize="md">Subtotal: ${subTotal.toFixed(2)}</Heading>
      {cartState.voucherDetails && <Heading fontSize="md">Voucher Discount: ${discountAmt.toFixed(2)}</Heading>}
      <Heading fontSize="md">Total Amount: ${(subTotal - discountAmt).toFixed(2)}</Heading>
    </>
  );

  const actionButtons = (
    <Flex flexDirection="column" gap={8} alignItems="flex-end">
      <Link to="/checkout">
        <Button width={isMobile ? "100%" : "auto"} borderRadius={0}>
          CHECK OUT
        </Button>
      </Link>
      <Button borderRadius={0} variant="outline" width={isMobile ? "100%" : "auto"}>
        CONTINUE SHOPPING
      </Button>
    </Flex>
  );

  const renderCartView = () => (
    <Box>
      {!isMobile && <CartHeader />}
      {cartState.items.map((item) => (
        <CartItem
          key={item.id + item.size}
          data={item}
          productInfo={productInfo?.[item.id]}
          isMobile={isMobile}
          onRemove={handleRemoveItem}
          onQuantityChange={onQuantityChange}
        />
      ))}
      <Flex alignItems="end" flexDirection="column">
        <VoucherSection />
        <Divider mb="4" />
        {billBreakdown}
        <Divider my="4" />
        {actionButtons}
      </Flex>
      <RemoveModal
        isOpen={isOpen}
        onClose={onClose}
        removeItem={() => removeItem(toBeRemoved.current.itemId, toBeRemoved.current.size)}
      />
    </Box>
  );

  const renderCartContent = () => {
    if (isLoading) {
      return <LoadingScreen text="Fetching Cart Details" />;
    }
    if (cartState?.items?.length === 0) {
      return <CartEmptyView />;
    }
    return renderCartView();
  };

  return (
    <Page>
      {CartHeading}
      <Divider />
      {renderCartContent()}
    </Page>
  );
};
