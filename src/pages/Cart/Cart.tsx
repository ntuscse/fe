import { useRef, useState, FC } from "react";
import {
  Button,
  Flex,
  Heading,
  useBreakpointValue,
  Divider,
  useDisclosure,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
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
import { CartItemType, ProductInfoMapType } from "../../typings/cart";
import Page from "../../components/Page";
import routes from "../../utils/constants/routes";

export const Cart: FC = () => {
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
  const { isLoading, isRefetching } = useQuery([QueryKeys.PRODUCTS], () => api.getProducts(), {
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
    <Flex flexDir="column" rowGap={[1, 2]}>
      <Flex justifyContent="space-between">
        <Text fontSize="md">Item(s) subtotal</Text>
        <Text>${subTotal.toFixed(2)}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text fontSize="md">Voucher Discount</Text>
        <Text>${discountAmt.toFixed(2)}</Text>
      </Flex>
      <Divider />
      <Flex justifyContent="space-between" fontWeight={600}>
        <Text fontSize="md">Total</Text>
        <Text>${(subTotal - discountAmt).toFixed(2)}</Text>
      </Flex>
    </Flex>
  );

  const actionButtons = (
    <Flex flexDirection="column" gap={4} alignItems="flex-end">
      <Link to={routes.CHECKOUT}>
        <Button borderRadius={0}>CHECK OUT</Button>
      </Link>
      <Link to={routes.MERCHANDISE_LIST}>
        <Button borderRadius={0} variant="outline">
          CONTINUE SHOPPING
        </Button>
      </Link>
    </Flex>
  );

  const renderCartView = () => (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(6, 1fr)" }}>
      <GridItem colSpan={4} px={[0, 4]}>
        {!isMobile && <CartHeader />}
        {cartState.items.map((item, index) => (
          <>
            <CartItem
              key={item.id + item.size}
              data={item}
              productInfo={productInfo?.[item.id]}
              isMobile={isMobile}
              onRemove={handleRemoveItem}
              onQuantityChange={onQuantityChange}
            />
            {index !== cartState.items.length - 1 && <Divider />}
          </>
        ))}
      </GridItem>
      <GridItem colSpan={2} px={[0, 4]}>
        <Flex p={3} gap={4} flexDir="column" borderWidth="1px" borderRadius="lg">
          <VoucherSection />
          <Divider />
          {billBreakdown}
          <Divider />
          {actionButtons}
        </Flex>
      </GridItem>
      <RemoveModal
        isOpen={isOpen}
        onClose={onClose}
        removeItem={() => removeItem(toBeRemoved.current.itemId, toBeRemoved.current.size)}
      />
    </Grid>
  );

  const renderCartContent = () => {
    if (isLoading || isRefetching) {
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
      {renderCartContent()}
    </Page>
  );
};
