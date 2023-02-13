import { FC, useEffect, useState } from "react";
import { Flex, Heading, Text, GridItem, Grid, Box, Image, Badge, Divider } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CartActionType, useCartStore } from "../../context/cart";
import { CartItemType, CheckoutResponseDto, ProductInfoMapType } from "../../typings/cart";
import { api } from "../../services/api";
import CartEmptyView from "../Cart/CartEmptyView";
import Page from "../../components/Page";
import routes from "../../utils/constants/routes";
import CheckoutSkeleton from "./Skeleton";
import StripeForm from "./StripeForm";
import { QueryKeys } from "../../utils/constants/queryKeys";
import { displayPrice } from "../../utils/functions/currency";

export const Checkout: FC = () => {
  // Cart Context Hook.
  const cartContext = useCartStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { state: cartState, dispatch: cartDispatch } = cartContext;
  const [checkoutState, setCheckoutState] = useState<CheckoutResponseDto | null>(null);

  // For mapping between cart item and info
  // const [productInfo, setProductInfo] = useState<ProductInfoMapType>({});
  const { data: products, isLoading: isProductsQueryLoading } = useQuery([QueryKeys.PRODUCTS], () => api.getProducts(), {});


  // No of items;
  const noOfItems = cartState.items.length;

  // Fetch and check if cart item is valid.
  const { mutate: initCheckout } = useMutation(() => api.postCheckoutCart(cartState.items, cartState.billingEmail, cartState.voucher), {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data: CheckoutResponseDto) => {
      setCheckoutState(data);
      const tempProductInfo: ProductInfoMapType = {};
      cartState.items.forEach((item: CartItemType) => {
        const product = data.items.find((i) => i.id === item.productId);
        if (!product) {
          const { productId, size } = item;
          cartDispatch({ type: CartActionType.REMOVE_ITEM, payload: { productId, size } });
        } else {
          tempProductInfo[product.id] = {
            image: product.images?.[0],
            price: product.price,
            name: product.name,
          };
        }
        // setProductInfo(tempProductInfo);
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const renderOrderSummary = () => {
    return (
      <Box borderWidth={1} borderRadius="lg" p={[4, 6]} boxShadow="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading fontSize={["xl", "2xl", "3xl"]}>Order Summary</Heading>
          <Link to={routes.CART}>
            <Text fontSize={["md", "l"]}>{`${noOfItems} item(s) Edit`}</Text>
          </Link>
        </Flex>
        <Text fontSize="sm">{`Name: ${cartState.name}`}</Text>
        <Text fontSize="sm">{`Billing email: ${cartState.billingEmail}`}</Text>
        {cartState.items?.map((item) => {
          const product = products?.find(({ id }) => id === item.productId);
          const subtotal = (product?.price ?? -1) * item.quantity;
          return (
            <Flex key={item.productId.toString()} mt={[4, 6]}>
              <Image 
                src={product?.images?.[0]} 
                fallbackSrc="https://via.placeholder.com/100" 
                boxSize="70"
                objectFit="contain"
                borderRadius="md" 
              />
              <Flex flexDirection="column" flex={1} ml={2}>
                <Flex justifyContent="space-between" alignItems="flex-start">
                  <Text fontWeight={500} noOfLines={2}>
                    {product?.name}
                  </Text>
                  <Text fontWeight={500}>{displayPrice(subtotal)}</Text>
                </Flex>
                <Flex justifyContent="space-between" color="gray.600" alignItems="center">
                  <Flex alignItems="center">
                    <Text fontSize="sm">{`Qty x${item.quantity}`}</Text>
                    <Badge h="fit-content" w="fit-content" ml={2}>
                      <Text textTransform="uppercase">{item.size}</Text>
                    </Badge>
                  </Flex>
                  <Text>{displayPrice(product?.price ?? 0)} each</Text>
                </Flex>
              </Flex>
            </Flex>
          );
        })}

        <Divider mt={[4, 8]} mb={[2, 4]} />
        <Flex justifyContent="flex-end" mt={2} fontWeight={500} fontSize={["sm", "md", "l"]} gap={2} color="gray.700">
          <Flex flexDir="column">
            {/*<Text>Subtotal:</Text>*/}
            {/*<Text>Discount:</Text>*/}
            <Text fontSize="lg">Grand total:</Text>
          </Flex>
          <Flex flexDir="column" textAlign="end">
            {/*<Text>{displayPrice(checkoutState?.price?.subtotal ?? 0)}</Text>*/}
            {/*<Text>{displayPrice(checkoutState?.price?.discount ?? 0)}</Text>*/}
            <Text fontSize="lg">{displayPrice(checkoutState?.price?.grandTotal ?? 0)}</Text>
          </Flex>
        </Flex>
      </Box>
    );
  };

  const renderCheckoutView = () => {
    return (
      <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }} rowGap={[4, 0]} columnGap={[0, 4]}>
        <GridItem px={[0, 4]} colSpan={1} mb={8}>
          {renderOrderSummary()}
        </GridItem>
        <GridItem px={[0, 4]} colSpan={1}>
          {checkoutState?.payment?.clientSecret &&
            <StripeForm clientSecret={checkoutState?.payment?.clientSecret} />
          }
        </GridItem>
      </Grid>
    );
  };

  const renderCheckoutContent = () => {
    if (isLoading) {
      return <CheckoutSkeleton />;
    }
    if (cartState.items.length === 0) {
      return <CartEmptyView />;
    }
    return renderCheckoutView();
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!cartState.billingEmail) {
      navigate(routes.CART);
      return;
    }
    initCheckout();
  }, []);

  return (
    <Page>
      <Heading textAlign="center" mb={[4, 6, 12]} size="xl">
        Checkout
      </Heading>
      {renderCheckoutContent()}
    </Page>
  );
};
