import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  Input,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LinkIcon } from "@chakra-ui/icons";
import CartItem from "./CartItem";
import RemoveModal from "./RemoveModal";
import CartHeader from "./CartHeader";
import { addCartVoucher, useCartStore } from "../../context/cart";
import { calCartSubTotal, calDiscountAmt } from "../../utils/functions/payment";

export const Cart = () => {
  // Context hook.
  const cartContext = useCartStore();
  const { state, dispatch } = cartContext;

  // Removal Modal states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toBeRemoved = React.useRef({ itemId: "", size: "" });

  // Voucher Input state.
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherLoading, setVoucherLoading] = useState(false);
  // Check if break point hit.
  const isMobile: boolean =
    useBreakpointValue({ base: true, md: false }) || false;

  // Calculate subtotal & discount amount.
  const subTotal = state.items.length > 0 ? calCartSubTotal(state.items) : 0;
  const discountAmt = calDiscountAmt(subTotal, state.voucherDetails);

  // Update Cart Item by Size & Id (To be changed next time: BE)
  const removeItem = (itemId: string, size: string) => {
    dispatch({ type: "remove_item", payload: { itemId, size } });
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
    dispatch({
      type: "update_quantity",
      payload: { itemId, size, qty },
    });
  };

  // Add Voucher (To be changed to API request: BE)
  const addVoucher = async () => {
    setVoucherLoading(true);
    await addCartVoucher("Random", dispatch);
    setVoucherInput("");
    setVoucherLoading(false);
  };

  React.useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <Box p={{ base: 8, lg: 12 }} maxWidth="1400px" mx="auto">
        <Heading textAlign="center" mb="12" size="xl">
          Shopping Cart
        </Heading>

        <Divider />
        {state.items.length === 0 ? (
          <Center minH="50vh">
            <Flex flexDirection="column" gap={4}>
              <Heading fontSize="2xl">No items in your cart.</Heading>
              <Button size="sm" flexShrink={1} borderRadius={0}>
                CONTINUE SHOPPING
              </Button>
            </Flex>
          </Center>
        ) : (
          <>
            {!isMobile && <CartHeader />}
            {state.items.map((item) => (
              <CartItem
                key={item.id + item.size}
                data={item}
                isMobile={isMobile}
                onRemove={handleRemoveItem}
                onQuantityChange={onQuantityChange}
              />
            ))}
            <Flex alignItems="end" flexDirection="column">
              <FormControl maxW={350} my={4}>
                <FormLabel htmlFor="voucher">
                  <Heading fontSize="md">Voucher</Heading>
                </FormLabel>
                <Flex gap={4}>
                  <Input
                    size="sm"
                    borderRadius={0}
                    id="voucher-code"
                    value={voucherInput}
                    disabled={voucherLoading}
                    placeholder="Voucher Code"
                    onChange={(e: React.FormEvent<EventTarget>) => {
                      const target = e.target as HTMLInputElement;
                      setVoucherInput(target.value);
                    }}
                  />
                  <Button
                    px={4}
                    size="sm"
                    isLoading={voucherLoading}
                    borderRadius={0}
                    variant="outline"
                    disabled={voucherInput.length === 0}
                    onClick={addVoucher}
                  >
                    Apply
                  </Button>
                </Flex>
                <FormHelperText>
                  {state.voucherDetails === undefined ? (
                    <Text>Apply your voucher code!</Text>
                  ) : (
                    <Text textAlign="right">
                      Applied Voucher: {state.voucherDetails.description}
                      {state.voucherDetails !== null && (
                        <Button
                          variant="link"
                          onClick={() => dispatch({ type: "remove_voucher" })}
                        >
                          <LinkIcon height={3} width={3} />
                        </Button>
                      )}
                    </Text>
                  )}
                </FormHelperText>
              </FormControl>
              <Divider mb="4" />
              <Heading fontSize="md">Subtotal: ${subTotal.toFixed(2)}</Heading>
              {state.voucherDetails && (
                <Heading fontSize="md">
                  Voucher Discount: ${discountAmt.toFixed(2)}
                </Heading>
              )}
              <Heading fontSize="md">
                Total Amount: {(subTotal - discountAmt).toFixed(2)}
              </Heading>
              <Divider my="4" />

              <Link to="/checkout">
                <Button width={isMobile ? "100%" : "auto"} borderRadius={0}>
                  CHECK OUT
                </Button>
              </Link>

              <br />
              <Button
                borderRadius={0}
                variant="outline"
                width={isMobile ? "100%" : "auto"}
              >
                CONTINUE SHOPPING
              </Button>
            </Flex>
          </>
        )}
      </Box>
      <RemoveModal
        isOpen={isOpen}
        onClose={onClose}
        removeItem={() =>
          removeItem(toBeRemoved.current.itemId, toBeRemoved.current.size)
        }
      />
    </>
  );
};
