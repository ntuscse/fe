import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, Heading, Text, Divider, Button, Input } from "@chakra-ui/react";
import { productList } from "../../data/mock/product";
import MerchCarousel from "./MerchCarousel";
import { BoxOption } from "./BoxOption";
import { CartAction, CartActionType, useCartStore } from "../../context/cart";
import { dummyBackendMerchResponse } from "../../data/mock/cart";
import MerchSkeleton from "./MerchSkeleton";
import MerchEmptyView from "./MerchEmptyView";
import { ProductSizeTypes, ProductType } from "../../typings/product";
import Page from "../../components/Page";

// All Sizes - Disable those are unavailable.
const ALL_SIZES: ProductSizeTypes[] = ["XXS", "XS", "S", "M", "L", "XL", "2XL"];

const GroupTitle = ({ children }: any) => (
  <Heading fontSize="md" mb={2} color="grey" textTransform="uppercase">
    {children}
  </Heading>
);

export const MerchDetail: React.FC = () => {
  // Context hook.
  const { dispatch: cartDispatch } = useCartStore();

  const { merchSlug } = useParams();
  const merchDetail = productList[0];
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [merchState, setMerchState] = useState<ProductType | null>(null);

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
        id: merchDetail?.id,
        imgUrl: merchDetail?.images[0],
        size: selectedSize ?? "S",
        price: merchDetail?.price,
        itemName: merchDetail?.name,
      },
    };
    cartDispatch(payload);
    setIsDisabled(false);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = `/cart`;
  };

  useEffect(() => {
    // TODO: async fetch to BE for Merch Order based on parameter.
    const fetchMerchDetail = async (slug: any) => {
      setIsLoading(true);
      const res = await dummyBackendMerchResponse(slug);
      return res;
    };

    fetchMerchDetail(merchSlug)
      .then((res) => {
        if (res !== null) {
          setMerchState(res);
          if (res?.sizes?.length > 0) {
            setSelectedSize(res?.sizes?.[0]);
          } else {
            setIsDisabled(true);
          }
        }
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => setIsLoading(false));
  }, [merchSlug]);

  const merchHeader = (
    <Flex flexDirection="column" gap={1}>
      <Heading color="primary.600" fontSize={{ base: "2xl", md: "4xl" }}>
        {merchState?.name}
      </Heading>
      <Text fontSize="xl" fontWeight={600} color="primary.600">
        ${merchState?.price?.toFixed(2)}
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
            <BoxOption
              key={idx.toString()}
              disabled={!merchState?.sizes.includes(size)}
              active={selectedSize === size}
              onClick={() => setSelectedSize(size)}
            >
              <Text fontSize={{ base: "sm", md: "md" }}>{size}</Text>
            </BoxOption>
          );
        })}
      </Flex>
    </Flex>
  );

  const renderQuantitySection = (
    <Flex flexDirection="column" mt={8}>
      <GroupTitle>Quantity</GroupTitle>
      <Flex gap={4}>
        <BoxOption active={false} onClick={() => handleQtyChangeCounter(false)}>
          -
        </BoxOption>
        <Input
          type="tel"
          pattern="[0-9]*"
          max={99}
          textAlign="center"
          value={quantity}
          borderRadius={0}
          maxWidth={100}
          placeholder="Item Count"
          onChange={handleQtyChangeInput}
        />
        <BoxOption active={false} onClick={() => handleQtyChangeCounter(true)}>
          +
        </BoxOption>
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
      <>
        <Flex flex={1} justifyContent="center">
          <MerchCarousel images={merchState?.images ?? []} />
        </Flex>
        <Flex flex={1} flexDirection="column">
          {merchHeader}
          <Divider mt={4} mb={6} />
          {renderSizeSection}
          {renderQuantitySection}
          <Divider my={6} />
          {purchaseButtons}
          <Divider my={6} />
          {renderDescription}
        </Flex>
      </>
    );
  };

  const renderMerchPage = () => {
    if (isLoading) return <MerchSkeleton />;
    if (merchState === null) return <MerchEmptyView />;
    return renderMerchDetails();
  };

  return <Page>{renderMerchPage()}</Page>;
};
