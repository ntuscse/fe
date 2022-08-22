import { FC, useState } from "react";
import { Flex, Heading, Text, Icon, GridItem, Grid, Input, Box, Image, Badge } from "@chakra-ui/react";
import { AiOutlineCreditCard } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import CardPaymentForm from "./CardPaymentForm";
import { CartActionType, useCartStore } from "../../context/cart";
import { calCartSubTotal, calDiscountAmt } from "../../utils/functions/price";
import { CartItemType, ProductInfoMapType } from "../../typings/cart";
import { QueryKeys } from "../../utils/constants/queryKeys";
import { api } from "../../services/api";
import { ProductType } from "../../typings/product";
import CartEmptyView from "../Cart/CartEmptyView";
import Page from "../../components/Page";
import routes from "../../utils/constants/routes";
import PaymentMethod from "./PaymentCard";
import PayNowForm from "./PaynowForm";
import CheckoutSkeleton from "./Skeleton";

enum PaymentTypes {
  CARD,
  PAYNOW,
}

export const Checkout: FC = () => {
  // Cart Context Hook.
  const cartContext = useCartStore();
  const { state: cartState, dispatch: cartDispatch } = cartContext;
  const [productInfo, setProductInfo] = useState<ProductInfoMapType>({});

  // Fetch and check if cart item is valid.
  const { isLoading, isRefetching } = useQuery([QueryKeys.PRODUCTS], () => api.getProducts(), {
    onSuccess: (data: ProductType[]) => {
      if (cartState.items.length === 0) {
        return;
      }
      const tempProductInfo: ProductInfoMapType = {};
      cartState.items.forEach((item: CartItemType) => {
        const product = data.find((i) => i.id === item.id);
        if (product && product.isAvailable) {
          tempProductInfo[product?.id] = {
            image: product?.images?.[0],
            price: product?.price,
            name: product.name,
          };
        } else {
          cartDispatch({ type: CartActionType.REMOVE_ITEM, payload: { id: item.id, size: item.size } });
        }
      });
      setProductInfo(tempProductInfo);
    },
  });

  // Calculate subtotal & discount amount.
  const noOfItems = cartState.items.length;
  const subTotal = calCartSubTotal(cartState.items, productInfo);
  const discountAmt = calDiscountAmt(subTotal, cartState.voucherDetails);
  const totalAmount = (subTotal - discountAmt).toFixed(2);
  // Payment Type.
  const [paymentType, setPaymentType] = useState<PaymentTypes>(PaymentTypes.CARD);

  const renderPaymentForm = () => {
    switch (paymentType) {
      case PaymentTypes.PAYNOW:
        return <PayNowForm />;
      default:
        return <CardPaymentForm />;
    }
  };

  const renderCheckoutView = () => (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }} rowGap={[4, 0]} columnGap={[0, 4]}>
      <GridItem px={[0, 4]} colSpan={1} mb={8}>
        <Box borderWidth={1} borderRadius="lg" p={[4, 6]} boxShadow="md">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading fontSize={["xl", "2xl", "3xl"]}>Order Summary</Heading>
            <Link to={routes.CART}>
              <Text fontSize={["md", "l"]}>{`${noOfItems} item(s) Edit`}</Text>
            </Link>
          </Flex>
          <Heading fontWeight={500} fontSize={["xl", "2xl", "3xl"]} mt={4} mb={8}>
            ${totalAmount}
          </Heading>
          {cartState.items.map((item) => {
            const product = productInfo?.[item.id];
            const subtotal = product.price * item.quantity;
            return (
              <Flex key={item.id} mt={4}>
                <Image src={product?.image} h={70} w={70} borderRadius="md" />
                <Flex flexDirection="column" flex={1} ml={2}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Flex alignItems="center" gap={2} fontWeight={500}>
                      <Text noOfLines={2}>{product.name}</Text>
                      <Badge>{item.size}</Badge>
                    </Flex>
                    <Text fontWeight={500}>${subtotal.toFixed(2)}</Text>
                  </Flex>
                  <Flex justifyContent="space-between" color="gray.600" alignItems="center">
                    <Text fontSize="sm">{`Qty x${item.quantity}`}</Text>
                    <Text>${product.price.toFixed(2)} each</Text>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
        </Box>
      </GridItem>
      <GridItem px={[0, 4]} colSpan={1}>
        <Flex flexDirection="column">
          <Text fontWeight={500} fontSize={["md", "l"]}>
            Contact information
          </Text>
          <Input size="md" placeholder="email" mt={2} />
          <Text fontWeight={500} fontSize={["md", "l"]} mt={6}>
            Payment method
          </Text>
          <Flex gap={4} flexWrap="wrap" mt={2}>
            <PaymentMethod
              text="Card"
              icon={<Icon as={AiOutlineCreditCard} h={6} w={6} />}
              onClick={() => setPaymentType(PaymentTypes.CARD)}
              isFocused={paymentType === PaymentTypes.CARD}
            />
            <PaymentMethod
              text="Paynow"
              icon={
                <Box
                  backgroundRepeat="no-repeat"
                  bgPos="center"
                  bgSize="cover"
                  backgroundImage="/images/Paynow-logo.png"
                  w={20}
                  h={6}
                />
              }
              onClick={() => setPaymentType(PaymentTypes.PAYNOW)}
              isFocused={paymentType === PaymentTypes.PAYNOW}
            />
          </Flex>
          <Box mt={8} />
          {renderPaymentForm()}
        </Flex>
      </GridItem>
    </Grid>
  );

  const renderCheckoutContent = () => {
    if (isLoading || isRefetching) {
      return <CheckoutSkeleton />;
    }
    if (cartState?.items?.length === 0) {
      return <CartEmptyView />;
    }
    return renderCheckoutView();
  };
  return (
    <Page>
      <Heading textAlign="center" mb={[4, 6, 12]} size="xl">
        Checkout
      </Heading>
      {renderCheckoutContent()}
    </Page>
  );
};
