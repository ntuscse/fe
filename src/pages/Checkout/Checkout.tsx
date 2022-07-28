import { FC, useState } from "react";
import { Flex, Heading, Text, Divider, Image, Icon } from "@chakra-ui/react";
import { AiOutlineCreditCard } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PaymentCard from "./PaymentCard";
import PayLahForm from "./PayLahForm";
import CardPaymentForm from "./CardPaymentForm";
import { CartActionType, useCartStore } from "../../context/cart";
import { calCartSubTotal, calDiscountAmt } from "../../utils/functions/price";
import { CartItemType, ProductInfoMapType } from "../../typings/cart";
import { QueryKeys } from "../../utils/constants/queryKeys";
import { api } from "../../services/api";
import { ProductType } from "../../typings/product";
import LoadingScreen from "../../components/LoadingScreen";
import CartEmptyView from "../Cart/CartEmptyView";
import Page from "../../components/Page";
import routes from "../../utils/constants/routes";

enum PaymentTypes {
  card,
  paylah,
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

  const subTotal = calCartSubTotal(cartState.items, productInfo);
  const discountAmt = calDiscountAmt(subTotal, cartState.voucherDetails);

  // Payment Type.
  const [paymentType, setPaymentType] = useState<PaymentTypes>(PaymentTypes.card);

  const renderPaymentForm = () => {
    switch (paymentType) {
      case PaymentTypes.paylah:
        return <PayLahForm />;
      default:
        return <CardPaymentForm />;
    }
  };

  const renderCheckoutView = () => (
    <Flex gap={8} mt={12} flexDir={{ base: "column-reverse", md: "row" }}>
      <Flex flex={2} p={6} borderWidth="1px" borderRadius="lg" overflow="hidden" flexDir="column">
        <Flex gap={4} flexWrap="wrap">
          <PaymentCard onClick={() => setPaymentType(PaymentTypes.card)} isFocused={paymentType === PaymentTypes.card}>
            <Icon as={AiOutlineCreditCard} h={6} w={6} />
            {JSON.stringify(isRefetching)}
            <Text fontWeight={500}>Card</Text>
          </PaymentCard>
          <PaymentCard
            onClick={() => setPaymentType(PaymentTypes.paylah)}
            isFocused={paymentType === PaymentTypes.paylah}
          >
            <Image
              height={6}
              width={6}
              src="https://play-lh.googleusercontent.com/jN6klarG9Q65oa0nHE-roczIUaIJlB3jlb5jAb1z75R7ycB-sFDkzNrt5-p3mIU_6A"
            />
            <Text fontWeight={500}>Paylah</Text>
          </PaymentCard>
        </Flex>
        {renderPaymentForm()}
      </Flex>
      <Flex flex={1} direction="column" gap={4}>
        <Flex p={3} gap={4} flexDir="column" borderWidth="1px" borderRadius="lg">
          <Flex justifyContent="space-between">
            <Text>Order Summary | {cartState.items.length} item(s)</Text>
            <Link to={routes.CART}>
              <Text as="u">Edit</Text>
            </Link>
          </Flex>
          <Divider />
          <Flex justifyContent="space-between">
            <Text>Item(s) subtotal</Text>
            <Text>${subTotal.toFixed(2)}</Text>
          </Flex>

          {cartState?.voucherDetails && (
            <Flex justifyContent="space-between">
              <Text>Voucher Discount</Text>
              <Text>-${discountAmt.toFixed(2)}</Text>
            </Flex>
          )}

          <Divider />
          <Flex justifyContent="space-between">
            <Text>Total Amount</Text>
            <Text>$ {(subTotal - discountAmt).toFixed(2)}</Text>
          </Flex>
        </Flex>
        <Flex p={3} gap={4} flexDir="column" borderWidth="1px" borderRadius="lg">
          <Flex gap={4} flexDir="column">
            <Text>Collection Details</Text>
            <Divider />
            <Text>
              An email will be sent to you closer to the collection date. Our collection venue is at 50 Nanyang Ave, #32
              Block N4 #02a, Singapore 639798
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );

  const renderCheckoutContent = () => {
    if (isLoading || isRefetching) {
      return <LoadingScreen text="Loading Cart Details" />;
    }
    if (cartState?.items?.length === 0) {
      return <CartEmptyView />;
    }
    return renderCheckoutView();
  };
  return (
    <Page>
      <Heading textAlign="center" mb="12" size="xl">
        Check Out
      </Heading>
      <Divider />
      {renderCheckoutContent()}
    </Page>
  );
};
