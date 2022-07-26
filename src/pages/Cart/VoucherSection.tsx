import React, { useState } from "react";
import { Button, Flex, Heading, Text, Input, FormControl, FormLabel, FormHelperText, Box } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import { useMutation } from "@tanstack/react-query";
import { CartActionType, useCartStore } from "../../context/cart";
import { QueryKeys } from "../../utils/constants/queryKeys";
import { api } from "../../services/api";
import { VoucherType } from "../../typings/voucher";

export const VoucherSection = () => {
  // Context hook.
  const cartContext = useCartStore();
  const { state: cartState, dispatch: cartDispatch } = cartContext;

  // Voucher Input cartState.
  const [voucherInput, setVoucherInput] = useState("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [voucherLoading, setVoucherLoading] = useState(false);
  // Fetch and check if cart item is valid.
  const { mutate: addVoucher } = useMutation([QueryKeys.VOUCHER, voucherInput], () => api.getVoucher(voucherInput), {
    onMutate: () => {
      setHasError(false);
      setVoucherLoading(true);
    },
    onSuccess: (data: VoucherType) => {
      setVoucherInput("");
      setVoucherLoading(false);
      if (!data) {
        setHasError(true);
        return;
      }
      cartDispatch({ type: CartActionType.APPLY_VOUCHER, payload: data });
    },
  });

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
          onClick={() => addVoucher()}
        >
          Apply
        </Button>
      </Flex>
      <FormHelperText>
        {cartState.voucherDetails === undefined ? (
          <Text>Apply your voucher code!</Text>
        ) : (
          <Text textAlign="right">
            {hasError && <Text color="red.500">Voucher does not exist.</Text>}
            {cartState.voucherDetails !== null && (
              <Flex justifyContent="flex-end">
                <Text color="green.500">Applied Voucher</Text>
                <Button ml={1} variant="link" onClick={() => cartDispatch({ type: "remove_voucher" })}>
                  <LinkIcon height={3} width={3} />
                </Button>
              </Flex>
            )}
          </Text>
        )}
      </FormHelperText>
    </FormControl>
  );
};
