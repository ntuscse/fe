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
  Box,
} from "@chakra-ui/react";

import { SmallCloseIcon } from "@chakra-ui/icons";
import { CartItemType, ProductInfoType } from "../../typings/cart";

export type CartItemProps = {
  isMobile: boolean;
  data: CartItemType;
  productInfo: ProductInfoType;
  onRemove: (itemId: string, size: string) => void;
  onQuantityChange: (itemId: string, size: string, qty: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({ isMobile, data, onRemove, onQuantityChange, productInfo }) => {
  const handleQtyChangeCounter = (isAdd: boolean = true) => {
    const value = isAdd ? 1 : -1;
    if (!isAdd && data.quantity === 1) {
      onRemove(data.id, data.size);
      return;
    }
    if (isAdd && data.quantity === 99) return;
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
      } else if (value > 99) {
        onQuantityChange(data.id, data.size, 99);
      } else {
        onQuantityChange(data.id, data.size, value);
      }
    }
  };
  const unitPrice = productInfo?.price?.toFixed(2) ?? 0;
  const subTotalPrice = ((productInfo?.price ?? 0) * data.quantity).toFixed(2);

  const quantityInput = (
    <InputGroup size="xs">
      <InputLeftAddon style={{ cursor: "pointer" }} onClick={() => handleQtyChangeCounter(false)}>
        -
      </InputLeftAddon>
      <Input
        type="tel"
        pattern="[0-9]*"
        textAlign="center"
        value={data.quantity}
        placeholder="Item Count"
        onChange={handleQtyChangeInput}
      />
      <InputRightAddon style={{ cursor: "pointer" }} onClick={() => handleQtyChangeCounter(true)}>
        +
      </InputRightAddon>
    </InputGroup>
  );
  const desktopView = (
    <Grid templateColumns="3fr repeat(4, 1fr)" rowGap={2}>
      <GridItem display="flex">
        <Box boxShadow="sm" maxWidth={[125, 100]}>
          <Image w="100%" borderRadius="md" src={productInfo?.image} fallbackSrc="https://via.placeholder.com/100" />
        </Box>
        <Flex flexDir="column" fontWeight="600" fontSize={["sm", "md"]} ml={2}>
          <Text color="primary.600" noOfLines={2}>
            {productInfo?.name}
          </Text>
          <Flex color="grey">
            <Flex>Size:</Flex>
            <Text ml={1} textTransform="uppercase">
              {data.size}
            </Text>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Text fontSize={["sm", "md"]} fontWeight={500}>
          ${unitPrice}
        </Text>
      </GridItem>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        {quantityInput}
      </GridItem>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Text fontSize={["sm", "md"]} fontWeight={500}>
          ${subTotalPrice}
        </Text>
      </GridItem>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Button size="sm" variant="link" onClick={() => onRemove(data.id, data.size)}>
          Delete
        </Button>
      </GridItem>
    </Grid>
  );

  const mobileView = (
    <Flex flex={1} justifyContent="center">
      <Box boxShadow="sm" borderRadius={5} maxW={150}>
        <Image w="100%" borderRadius={5} src={productInfo?.image} fallbackSrc="https://via.placeholder.com/100" />
      </Box>
      <Flex flexDir="column" fontWeight="600" fontSize={["xs", "sm"]} ml={4} gap={2}>
        <Flex justifyContent="space-between" gap={2}>
          <Text noOfLines={2} color="primary.600">
            {productInfo?.name}
          </Text>
          <Button size="sm" variant="link" onClick={() => onRemove(data.id, data.size)}>
            <SmallCloseIcon h={5} w={5} />
          </Button>
        </Flex>
        <Flex color="grey">
          Size:
          <Text ml={1} textTransform="uppercase">
            {data.size}
          </Text>
        </Flex>
        <Text fontWeight={500}>Unit Price: ${unitPrice}</Text>
        {quantityInput}
        <Text fontWeight={500}>Subtotal: ${subTotalPrice}</Text>
      </Flex>
    </Flex>
  );
  return <Flex my="4">{!isMobile ? desktopView : mobileView}</Flex>;
};

export default CartItem;
