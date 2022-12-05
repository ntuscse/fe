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
import { ProductType } from "../../typings/product";
import { displayPrice } from "../../utils/functions/currency";

export type CartItemProps = {
  isMobile: boolean;
  data: CartItemType;
  productInfo?: ProductType;
  isLoading: boolean;
  onRemove: (productId: string, size: string) => void;
  onQuantityChange: (productId: string, size: string, qty: number) => void;
};

const MIN_ITEM_CNT = 1;
const MAX_ITEM_CNT = 99;

const CartItem: React.FC<CartItemProps> = ({ isMobile, data, onRemove, onQuantityChange, productInfo }) => {
  const handleQtyChangeCounter = (isAdd: boolean = true) => {
    const value = isAdd ? 1 : -1;
    if (!isAdd && data.quantity === MIN_ITEM_CNT) {
      onRemove(data.productId, data.size);
      return;
    }
    if (isAdd && data.quantity === MAX_ITEM_CNT) return;
    onQuantityChange(data.productId, data.size, data.quantity + value);
  };

  const handleQtyChangeInput = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    if (Number.isNaN(parseInt(target.value, 10))) {
      onQuantityChange(data.productId, data.size, MIN_ITEM_CNT);
    } else {
      const value = parseInt(target.value, 10);
      if (value <= 0) {
        onRemove(data.productId, data.size);
      } else if (value > MAX_ITEM_CNT) {
        onQuantityChange(data.productId, data.size, MAX_ITEM_CNT);
      } else {
        onQuantityChange(data.productId, data.size, value);
      }
    }
  };
  const unitPrice = displayPrice(productInfo?.price ?? 0);
  const subTotalPrice = displayPrice((productInfo?.price ?? 0) * data.quantity);

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
          <Image w="100%" borderRadius="md" src={productInfo?.images?.[0]} fallbackSrc="https://via.placeholder.com/100" />
        </Box>
        <Flex flexDir="column" fontWeight="600" fontSize={["sm", "md"]} ml={2}>
          <Text color="primary.600" noOfLines={2}>
            {productInfo?.name}
          </Text>
          <Flex color="grey">
            <Flex>Size:</Flex>
            <Text ml={1}>
              {data.size}
            </Text>
          </Flex>
          <Flex color="grey">
            <Flex>Color:</Flex>
            <Text ml={1}>
              {data.colorway}
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
        <Button size="sm" variant="link" onClick={() => onRemove(data.productId, data.size)}>
          Delete
        </Button>
      </GridItem>
    </Grid>
  );

  const mobileView = (
    <Flex flex={1} justifyContent="center">
      <Box boxShadow="sm" borderRadius={5} maxW={150}>
        <Image w="100%" borderRadius={5} src={productInfo?.images?.[0]} fallbackSrc="https://via.placeholder.com/100" />
      </Box>
      <Flex flexDir="column" fontWeight="600" fontSize={["xs", "sm"]} ml={4} gap={2}>
        <Flex justifyContent="space-between" gap={1}>
          <Text noOfLines={2} color="primary.600">
            {productInfo?.name}
          </Text>
          <Button size="sm" variant="link" onClick={() => onRemove(data.productId, data.size)}>
            <SmallCloseIcon h={5} w={5} />
          </Button>
        </Flex>
        <Flex color="grey" direction="column">
          <Flex>
            Size:{" "}
            <Text textTransform="uppercase">
              {data.size}
            </Text>
          </Flex>
          <Box>
          Color:{" "}
            {data.colorway}
          </Box>
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
