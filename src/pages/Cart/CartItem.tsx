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
} from "@chakra-ui/react";

import { SmallCloseIcon } from "@chakra-ui/icons";
import { CartItemType } from "../../typings/cart";

export type CartItemProps = {
  isMobile: boolean;
  data: CartItemType;
  onRemove: (itemId: string, size: string) => void;
  onQuantityChange: (itemId: string, size: string, qty: number) => void;
};

const CartItem: React.FC<CartItemProps> = (props: CartItemProps) => {
  const { isMobile, data, onRemove, onQuantityChange } = props;

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
        {/* <Image width="100" height="100" objectFit="cover" src={data.imgUrl} /> */}
        <Grid templateColumns={!isMobile ? "3fr repeat(3, 1fr)" : "1fr"}>
          <GridItem pl="4">
            <Flex h={isMobile ? "auto" : 100} alignItems="center">
              <Text fontSize={isMobile ? "xs" : "md"}>
                {/* {data.itemName} */}
                <br />
                Size: {data.size}
              </Text>
            </Flex>
          </GridItem>
          <GridItem pl="4">
            <Flex {...flexItemConfig}>
              <Text fontSize={isMobile ? "xs" : "md"}>
                {/* {isMobile && "Unit Price:"} ${data?.price.toFixed(2)} */}
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
              <Text fontSize={isMobile ? "xs" : "md"}>
                {/* {isMobile && "Subtotal:"} ${(data.price * data.quantity).toFixed(2)} */}
              </Text>
            </Flex>
          </GridItem>
        </Grid>
        <Flex alignItems={isMobile ? "start" : "center"}>
          {/* <Button size="sm" variant="link" onClick={() => onRemove(data.id, data.size)}>
            {isMobile ? <SmallCloseIcon h={5} w={5} /> : "Delete"}
          </Button> */}
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default CartItem;
