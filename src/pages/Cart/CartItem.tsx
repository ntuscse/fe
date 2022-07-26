import React from "react";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Input,
  InputLeftAddon,
  InputRightAddon,
  InputGroup,
  Divider,
  Box,
} from "@chakra-ui/react";

import { SmallCloseIcon } from "@chakra-ui/icons";
import { CartItemType } from "../../typings/cart";
import { ProductInfoType } from "./Cart";

export type CartItemProps = {
  isMobile: boolean;
  data: CartItemType;
  productInfo: ProductInfoType;
  onRemove: (itemId: string, size: string) => void;
  onQuantityChange: (itemId: string, size: string, qty: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({ isMobile, data, onRemove, onQuantityChange, productInfo }) => {
  const flexItemConfig = {
    alignItems: "center",
    h: isMobile ? "auto" : 100,
    justifyContent: isMobile ? "start" : "center",
  };

  const handleQtyChangeCounter = (isAdd: boolean = true) => {
    const value = isAdd ? 1 : -1;
    if (!isAdd && data.quantity === 1) {
      onRemove(data.id, data.size);
      return;
    }
    onQuantityChange(data.id, data.size, data.quantity + value);
  };

  const handleQtyChangeInput = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    if (Number.isNaN(parseInt(target.value, 10))) {
      onQuantityChange(data.id, data.size, 1);
    } else {
      const value = parseInt(target.value, 10);
      if (value <= 0) {
        onRemove(data.id, data.size);
      }
      onQuantityChange(data.id, data.size, value);
    }
  };

  return (
    <>
      <Flex my="4" justifyContent="center">
        <Box boxShadow="sm" borderRadius={5} maxW={isMobile ? 150 : 100}>
          <Image w="100%" borderRadius={5} src={productInfo?.image} fallbackSrc="https://via.placeholder.com/100" />
        </Box>
        <Grid templateColumns={!isMobile ? "3fr repeat(3, 1fr)" : "1fr"} rowGap={2}>
          <GridItem pl="4">
            <Flex h={isMobile ? "auto" : 100} flexDir="column" fontWeight="600" fontSize={isMobile ? "sm" : "md"}>
              <Text color="primary.600">{productInfo?.name}</Text>
              <Flex color="grey">
                Size:
                <Text ml={1} textTransform="uppercase">
                  {data.size}
                </Text>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem pl="4">
            <Flex {...flexItemConfig}>
              <Text fontSize={isMobile ? "sm" : "md"} fontWeight={500}>
                {isMobile && "Unit Price:"} ${productInfo?.price?.toFixed(2) ?? 0}
              </Text>
            </Flex>
          </GridItem>
          <GridItem pl="4">
            <Flex {...flexItemConfig}>
              <InputGroup size="xs">
                <InputLeftAddon style={{ cursor: "pointer" }} onClick={() => handleQtyChangeCounter(false)}>
                  -
                </InputLeftAddon>
                <Input
                  pattern="[0-9]*"
                  type="tel"
                  textAlign="center"
                  value={data.quantity}
                  placeholder="Item Count"
                  onChange={handleQtyChangeInput}
                />
                <InputRightAddon style={{ cursor: "pointer" }} onClick={() => handleQtyChangeCounter(true)}>
                  +
                </InputRightAddon>
              </InputGroup>
            </Flex>
          </GridItem>
          <GridItem pl="4">
            <Flex {...flexItemConfig}>
              <Text fontSize={isMobile ? "sm" : "md"} fontWeight={500}>
                {isMobile && "Subtotal:"} ${(productInfo?.price ?? 0 * data.quantity).toFixed(2)}
              </Text>
            </Flex>
          </GridItem>
        </Grid>
        <Flex alignItems={isMobile ? "start" : "center"}>
          <Button size="sm" variant="link" onClick={() => onRemove(data.id, data.size)}>
            {isMobile ? <SmallCloseIcon h={5} w={5} /> : "Delete"}
          </Button>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default CartItem;
