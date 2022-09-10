import React, { useRef, useState, FC, useEffect, useCallback } from "react";
import {
  Button,
  Flex,
  Heading,
  useBreakpointValue,
  Divider,
  useDisclosure,
  Grid,
  GridItem,
  Text,
  Input,
  Spinner,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Joi from "joi";
import _ from "lodash";
import { LinkIcon } from "@chakra-ui/icons";
import CartItem from "./CartItem";
import RemoveModal from "./RemoveModal";
import CartHeader from "./CartHeader";
import CartEmptyView from "./CartEmptyView";
import { CartAction, CartActionType, useCartStore } from "../../context/cart";
import LoadingScreen from "../../components/LoadingScreen";
import { api } from "../../services/api";
import { CartItemType, CartPriceType, CartResponseDto, ProductInfoMapType } from "../../typings/cart";
import Page from "../../components/Page";
import routes from "../../utils/constants/routes";
import CartCard from "../../components/CartCard";

type ValidationType = {
  error: boolean;
  isLoading: boolean;
};

const initCartPrice = {
  currency: "SGD",
  subtotal: 0,
  discount: 0,
  grandTotal: 0,
};

export const Cart: FC = () => {
  const navigate = useNavigate();
  // Context hook.
  const cartContext = useCartStore();
  const { state: cartState, dispatch: cartDispatch } = cartContext;

  const [reroute, setReroute] = useState<boolean>(false);

  // Email input for billing.
  const [billingEmail, setBillingEmail] = useState<string>("");
  const [validation, setValidation] = useState<ValidationType>({ isLoading: false, error: false });

  // Calculation of pricing
  const [priceLoading, setPriceLoading] = useState<boolean>(false);
  const [priceInfo, setPriceInfo] = useState<CartPriceType>(initCartPrice);

  // For mapping between cart item and info
  const [productInfo, setProductInfo] = useState<ProductInfoMapType>({});

  // Voucher section
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherError, setVoucherError] = useState<boolean>(false);

  const emailValidator = Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email");

  // Removal Modal cartStates
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toBeRemoved = useRef({ productId: "", size: "" });

  // Check if break point hit.
  const isMobile: boolean = useBreakpointValue({ base: true, md: false }) || false;

  // Initialise Cart page
  const { mutate: initCartPage, isLoading: isCartLoading } = useMutation(
    () => api.calcCartPrice(cartState.items, cartState.voucher),
    {
      onSuccess: (data: CartResponseDto) => {
        // Validate cart product id is correct
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
        });
        setProductInfo(tempProductInfo);
      },
    }
  );

  // Calculate price - Used when updating / removing of items.
  const { mutate: calcCartPrice } = useMutation(() => api.calcCartPrice(cartState.items, cartState.voucher), {
    onSuccess: (data: CartResponseDto) => {
      setPriceInfo(data.price);
    },
    onSettled: () => {
      setPriceLoading(false);
    },
  });

  // Apply voucher -
  const { mutate: applyVoucher, isLoading: voucherLoading } = useMutation(
    () => api.calcCartPrice(cartState.items, voucherInput),
    {
      onMutate: () => {
        setPriceLoading(true);
      },
      onSuccess: (data: CartResponseDto) => {
        setPriceInfo(data.price);
        if (data.price.discount > 0) {
          // Voucher is valid
          cartDispatch({ type: CartActionType.VALID_VOUCHER, payload: voucherInput });
          setVoucherError(false);
          setVoucherInput("");
        } else {
          setVoucherError(true);
        }
      },
      onSettled: () => {
        setPriceLoading(false);
      },
    }
  );

  const handleRemoveVoucher = () => {
    setVoucherInput("");
    cartDispatch({ type: CartActionType.REMOVE_VOUCHER, payload: voucherInput });
    applyVoucher();
  };

  // Update Cart Item by Size & Id (To be changed next time: BE)
  const removeItem = (productId: string, size: string) => {
    setPriceLoading(true);
    cartDispatch({
      type: CartActionType.REMOVE_ITEM,
      payload: { productId, size },
    });
    onClose();
  };

  // Set modal's ref value to size & productId pair.
  const handleRemoveItem = (productId: string, size: string) => {
    onOpen();
    toBeRemoved.current.size = size;
    toBeRemoved.current.productId = productId;
  };

  // Update Cart Item by Size & Id (To be changed next time: BE)
  const onQuantityChange = (productId: string, size: string, qty: number) => {
    setPriceLoading(true);
    const action: CartAction = {
      type: CartActionType.UPDATE_QUANTITY,
      payload: { productId, size, quantity: qty },
    };
    cartDispatch(action);
  };

  const handleToCheckout = async () => {
    setValidation({ isLoading: true, error: false });
    try {
      await emailValidator.validateAsync(billingEmail);
      cartDispatch({ type: CartActionType.UPDATE_BILLING_EMAIL, payload: billingEmail });
      setReroute(true);
    } catch (error: any) {
      setValidation({ isLoading: false, error: true });
    }
  };

  const CartHeading = (
    <Heading textAlign="center" mb={[4, 6, 12]} size="xl">
      Shopping Cart
    </Heading>
  );

  const PriceInfoSection = (
    <CartCard title="Order Summary" mt={[2, 4]}>
      {priceLoading ? (
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Spinner />
          <Text mt={2}>Calculating your cart price</Text>
        </Flex>
      ) : (
        <>
          <Flex flexDir="column" gap={[2, 3]}>
            <Flex justifyContent="space-between" fontSize={["sm", "md"]}>
              <Text>Item(s) subtotal</Text>
              <Text>{priceInfo.subtotal.toFixed(2)}</Text>
            </Flex>
            <Flex justifyContent="space-between" fontSize={["sm", "md"]}>
              <Text>Voucher Discount</Text>
              <Text noOfLines={1}>{priceInfo.discount.toFixed(2)}</Text>
            </Flex>
            <Divider />
            <Flex justifyContent="space-between" fontSize={["sm", "md"]} fontWeight={600}>
              <Text>Total</Text>
              <Text>{priceInfo.grandTotal.toFixed(2)}</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex flexDirection="column" rowGap={2}>
            <Input
              required
              placeholder="Billing email address"
              value={billingEmail}
              id="email"
              type="text"
              onChange={(event) => setBillingEmail(event.target.value)}
            />
            <Text fontSize="sm" color="red">
              {validation.error && "*Invalid email format"}
            </Text>
            <Button
              width="100%"
              onClick={handleToCheckout}
              isLoading={validation.isLoading}
              disabled={billingEmail.length === 0 || validation.isLoading}
            >
              CHECK OUT
            </Button>

            <Link to={routes.MERCHANDISE_LIST}>
              <Button width="100%" variant="outline">
                CONTINUE SHOPPING
              </Button>
            </Link>
          </Flex>
        </>
      )}
    </CartCard>
  );

  const VoucherSection = (
    <CartCard title="Voucher">
      <FormControl>
        <Flex gap={2}>
          <Input
            size="sm"
            flex={1}
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
            variant="outline"
            disabled={voucherInput.length === 0 || priceLoading || voucherLoading}
            onClick={() => applyVoucher()}
          >
            Apply
          </Button>
        </Flex>
        <FormHelperText>
          {!cartState.voucher ? (
            <Text>Apply your voucher code!</Text>
          ) : (
            <Text textAlign="right">
              {voucherError && <Text color="red.500">Invalid voucher</Text>}
              {cartState.voucher && priceInfo.discount > 0 && (
                <Flex justifyContent="flex-end">
                  <Text color="green.500">Applied Voucher</Text>
                  <Button ml={1} variant="link" onClick={handleRemoveVoucher}>
                    <LinkIcon height={3} width={3} />
                  </Button>
                </Flex>
              )}
            </Text>
          )}
        </FormHelperText>
      </FormControl>
    </CartCard>
  );

  const renderCartView = () => (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(6, 1fr)" }}>
      <GridItem colSpan={4} px={[0, 4]}>
        {!isMobile && <CartHeader />}
        {cartState.items.map((item, index) => (
          <>
            <CartItem
              key={item.productId + item.size}
              data={item}
              productInfo={productInfo?.[item.productId]}
              isMobile={isMobile}
              onRemove={handleRemoveItem}
              onQuantityChange={onQuantityChange}
            />
            {index !== cartState.items.length - 1 && <Divider />}
          </>
        ))}
      </GridItem>
      <GridItem colSpan={2} px={[0, 4]}>
        {VoucherSection}
        {PriceInfoSection}
        <CartCard title="Collection Details" mt={[2, 4]}>
          <Text fontSize={["xs", "sm"]}>
            An email will be sent to you closer to the collection date. Our collection venue is at 50 Nanyang Ave, #32
            Block N4 #02a, Singapore 639798
          </Text>
        </CartCard>
      </GridItem>
      <RemoveModal
        isOpen={isOpen}
        onClose={onClose}
        removeItem={() => removeItem(toBeRemoved.current.productId, toBeRemoved.current.size)}
      />
    </Grid>
  );

  const renderCartContent = () => {
    if (isCartLoading) {
      return <LoadingScreen text="Fetching Cart Details" />;
    }
    if (cartState.items.length === 0) {
      return <CartEmptyView />;
    }
    return renderCartView();
  };

  const debounceCalc = useCallback(_.debounce(calcCartPrice, 2000), []);

  useEffect(() => {
    initCartPage();
  }, []);

  useEffect(() => {
    debounceCalc();
  }, [cartState.items, cartState.voucher]);

  useEffect(() => {
    if (reroute) {
      navigate(routes.CHECKOUT);
    }
  }, [reroute]);

  return (
    <Page>
      {CartHeading}
      {renderCartContent()}
    </Page>
  );
};
