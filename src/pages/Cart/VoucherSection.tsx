import React, { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";

import { LinkIcon } from "@chakra-ui/icons";
import { addCartVoucher, useCartStore } from "../../context/cart";

export const VoucherSection = () => {
  // Context hook.
  const cartContext = useCartStore();
  const { state: cartState, dispatch: cartDispatch } = cartContext;

  // Voucher Input cartState.
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherLoading, setVoucherLoading] = useState(false);

  // Add Voucher (To be changed to API request: BE)
  const addVoucher = async () => {
    setVoucherLoading(true);
    await addCartVoucher(voucherInput, cartDispatch);
    setVoucherInput("");
    setVoucherLoading(false);
  };

  return (
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
        {cartState.voucherDetails === undefined ? (
          <Text>Apply your voucher code!</Text>
        ) : (
          <Text textAlign="right">
            Applied Voucher: {cartState?.voucherDetails?.description}
            {cartState.voucherDetails !== null && (
              <Button
                variant="link"
                onClick={() => cartDispatch({ type: "remove_voucher" })}
              >
                <LinkIcon height={3} width={3} />
              </Button>
            )}
          </Text>
        )}
      </FormHelperText>
    </FormControl>
  );
};
