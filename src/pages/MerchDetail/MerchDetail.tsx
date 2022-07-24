import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, Heading, Text, Divider, Button, Input, Grid, GridItem, Badge } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { productList } from "../../data/mock/product";
import MerchCarousel from "./MerchCarousel";
import { SizeOption } from "./SizeOption";
import { CartAction, CartActionType, useCartStore } from "../../context/cart";
import MerchSkeleton from "./MerchSkeleton";
import MerchEmptyView from "./MerchEmptyView";
import { ProductSizeTypes, ProductType } from "../../typings/product";
import Page from "../../components/Page";
import { QueryKeys } from "../../utils/constants/queryKeys";
import { api } from "../../services/api";

// All Sizes - Disable those are unavailable.
const ALL_SIZES: ProductSizeTypes[] = ["xxs", "xs", "s", "m", "l", "xl", "2xl"];

const GroupTitle = ({ children }: any) => (
  <Heading fontSize="md" mb={2} color="grey" textTransform="uppercase">
    {children}
  </Heading>
);

const fetchProductDetail = async (productId: string): Promise<ProductType | null> => {
  if (productId) {
    const productDetail = await api.getProduct(productId);
    return productDetail ?? productList.find((p) => p.id === productId);
  }
  return null;
};

export const MerchDetail: React.FC = () => {
  // Context hook.
  const { dispatch: cartDispatch } = useCartStore();
  const { slug: productSlug = "" } = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { data: product, isLoading } = useQuery([QueryKeys.PRODUCT], () => fetchProductDetail(productSlug), {
    onSuccess: (data: ProductType) => {
      setIsDisabled(!(data?.isAvailable === true));
      setSelectedSize(data?.sizes?.[0] ?? null);
    },
  });

  //* In/decrement quantity
  const handleQtyChangeCounter = (isAdd: boolean = true) => {
    const value = isAdd ? 1 : -1;
    if (!isAdd && quantity === 1) return;
    setQuantity(quantity + value);
  };

  //* Manual input quantity.
  const handleQtyChangeInput = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    if (Number.isNaN(parseInt(target.value, 10))) {
      setQuantity(1);
      return;
    }
    const value = parseInt(target.value, 10);
    if (value <= 0) {
      setQuantity(1);
      return;
    }
    setQuantity(value);
  };

  const handleAddToCart = () => {
    setIsDisabled(true);
    const payload: CartAction = {
      type: CartActionType.ADD_ITEM,
      payload: {
        quantity,
        id: productSlug,
        size: selectedSize ?? product?.sizes?.[0] ?? "",
      },
    };
    cartDispatch(payload);
    setIsDisabled(false);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = `/cart`;
  };

  const ProductNameSection = (
    <Flex flexDirection="column" gap={1}>
      <Heading color="primary.600" fontSize={{ base: "2xl", md: "4xl" }}>
        {product?.name}
        {!product?.isAvailable && (
          <Badge color="grey" ml={4} variant="outline" display="inline">
            unavailable
          </Badge>
        )}
      </Heading>
      <Text fontSize="xl" fontWeight={600} color="primary.600">
        ${product?.price?.toFixed(2)}
      </Text>
    </Flex>
  );

  const renderSizeSection = (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between" mb={2} display="flex">
        <GroupTitle>Sizes</GroupTitle>
        <Button size="sm" variant="unstyled">
          Size Chart
        </Button>
      </Flex>
      <Flex gap="15px" flexWrap="wrap">
        {ALL_SIZES.map((size, idx) => {
          return (
            <SizeOption
              key={idx.toString()}
              active={selectedSize === size}
              onClick={() => setSelectedSize(size)}
              disabled={isDisabled || !product?.sizes.includes(size)}
            >
              <Text textTransform="uppercase" fontSize={{ base: "sm", md: "md" }}>
                {size}
              </Text>
            </SizeOption>
          );
        })}
      </Flex>
    </Flex>
  );

  const renderQuantitySection = (
    <Flex flexDirection="column" mt={8}>
      <GroupTitle>Quantity</GroupTitle>
      <Flex gap={4}>
        <SizeOption disabled={isDisabled} active={false} onClick={() => handleQtyChangeCounter(false)}>
          -
        </SizeOption>
        <Input
          type="tel"
          pattern="[0-9]*"
          max={99}
          textAlign="center"
          value={quantity}
          borderRadius={0}
          maxWidth={100}
          placeholder="Item Count"
          disabled={isDisabled}
          onChange={handleQtyChangeInput}
        />
        <SizeOption disabled={isDisabled} active={false} onClick={() => handleQtyChangeCounter(true)}>
          +
        </SizeOption>
      </Flex>
    </Flex>
  );

  const purchaseButtons = (
    <Flex gap={4} flexWrap="wrap">
      <Button flex={1} borderRadius={0} variant="outline" onClick={handleAddToCart} disabled={isDisabled}>
        ADD TO CART
      </Button>
      <Button flex={1} borderRadius={0} onClick={handleBuyNow} disabled={isDisabled}>
        BUY NOW
      </Button>
    </Flex>
  );

  const renderDescription = (
    <Flex flexDirection="column" gap={2}>
      <GroupTitle>Description</GroupTitle>
      <Box whiteSpace="pre-line" fontSize={{ base: "sm", md: "md" }}>
        {`Keep cool all summer in these versatile pants, the neat shape slims the legs and flatters the bottom. A great staple garment to add to your wardrobe. The luxurious washed linen is comfortable, breathable and soft. The 7/8 Length leg can be worn rolled up to a crop pant. Style with our Broderie Anglaise or Fray Top.\n
  \n
  *100% European Linen\n*Contrast stripe lined pockets\n*Stitched inseam pockets\n`
          .split("\n")
          ?.map((line, idx) => {
            if (line) {
              return line.trim().startsWith("*") ? <li key={idx.toString()}>{line.trim().substring(1)}</li> : line;
            }
            return <br key={idx.toString()} />;
          })}
      </Box>
    </Flex>
  );

  const renderMerchDetails = () => {
    return (
      <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(5, 1fr)" }} columnGap={16}>
        <GridItem colSpan={2}>
          <MerchCarousel images={product?.images ?? []} />
        </GridItem>
        <GridItem colSpan={3}>
          {ProductNameSection}
          <Divider mt={4} mb={6} />
          {renderSizeSection}
          {renderQuantitySection}
          <Divider my={6} />
          {purchaseButtons}
          <Divider my={6} />
          {renderDescription}
        </GridItem>
      </Grid>
    );
  };

  const renderMerchPage = () => {
    if (isLoading) return <MerchSkeleton />;
    if (product === undefined || product === null) return <MerchEmptyView />;
    return renderMerchDetails();
  };

  return <Page>{renderMerchPage()}</Page>;
};
