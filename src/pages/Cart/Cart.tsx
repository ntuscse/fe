import React, { useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  useBreakpointValue,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import RemoveModal from "./RemoveModal";
import CartHeader from "./CartHeader";
import CartEmptyView from "./CartEmptyView";
import { CartAction, CartActionType, useCartStore } from "../../context/cart";
import { VoucherSection } from "./VoucherSection";
import { calCartSubTotal, calDiscountAmt } from "../../utils/functions/payment";
import LoadingScreen from "../../components/LoadingScreen";

export const Cart: React.FC = () => {
  // Context hook.
  const cartContext = useCartStore();
  const { state: cartState, dispatch: cartDispatch } = cartContext;

  // Removal Modal cartStates
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toBeRemoved = useRef({ itemId: "", size: "" });

  // Check if break point hit.
  const isMobile: boolean =
    useBreakpointValue({ base: true, md: false }) || false;

  // Calculate subtotal & discount amount.
  const subTotal =
    cartState.items.length > 0 ? calCartSubTotal(cartState.items) : 0;
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
      {cartState.voucherDetails && (
        <Heading fontSize="md">
          Voucher Discount: ${discountAmt.toFixed(2)}
        </Heading>
      )}
      <Heading fontSize="md">
        Total Amount: {(subTotal - discountAmt).toFixed(2)}
      </Heading>
    </>
  );

  const actionButtons = (
    <Flex flexDirection="column" gap={8} alignItems="flex-end">
      <Link to="/checkout">
        <Button width={isMobile ? "100%" : "auto"} borderRadius={0}>
          CHECK OUT
        </Button>
      </Link>
      <Button
        borderRadius={0}
        variant="outline"
        width={isMobile ? "100%" : "auto"}
      >
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
        removeItem={() =>
          removeItem(toBeRemoved.current.itemId, toBeRemoved.current.size)
        }
      />
    </Box>
  );

  const renderCartContent = () => {
    if (cartState.fetchStatus) {
      return <LoadingScreen text="Fetching Cart Details" />;
    }
    if (cartState?.items?.length === 0) {
      return <CartEmptyView />;
    }
    return renderCartView();
  };

  return (
    <Box p={{ base: 8, lg: 12 }} maxWidth="1400px" mx="auto">
      {CartHeading}
      <Divider />
      {renderCartContent()}
    </Box>
  );
};
