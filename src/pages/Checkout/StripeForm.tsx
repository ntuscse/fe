import React, { useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button , useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CartAction,CartActionType, useCartStore } from "../../context/cart";
import routes from "../../utils/constants/routes";
import { OrderStatusType } from "../../typings/order";
import { api } from "../../services/api";
import { useCheckoutStore } from "../../context/checkout";



type StripeFormProps = {
  clientSecret: string;
};
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLISHABLE_STRIPE_KEY}`);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cartContext = useCartStore();
  const navigate = useNavigate();
  const { dispatch: cartDispatch, state: cartState } = cartContext;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const { state: checkoutState } = useCheckoutStore()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    // Stripe.js has not yet loaded.
    if (!stripe || !elements) return;

    setIsLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        receipt_email: cartState.billingEmail,
      },
    });
    setIsLoading(false);
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toast({
        title:'Error',
        description:(result?.error.message),
        status:'error',
        isClosable: true,
      });
    } else {
      // TODO: CURRENTLY HARDCODED ONLY 1 ORDER, CHANGE IN THE FUTURE WHEN BACKEND IMPLEMENTED
      // TODO: MIGRATE INTO HELPER FUNCTION UNDER API 'setOrderPaymentSucess'
      // TODO: remove userId as we do not have a login
      // TODO: order ID to be generated iteratively with api call
      setIsLoading(true);

      const payload : CartAction = {
       type: CartActionType.RESET_CART
      }
      cartDispatch(payload);
      setIsLoading(false);
      navigate(`${routes.ORDER_SUMMARY}/${checkoutState?.orderId}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button mt={2} type="submit" disabled={!stripe || !elements || isLoading} width="100%" isLoading={isLoading}>
        Pay
      </Button>
    </form>
  );
};

const StripeForm: React.FC<StripeFormProps> = (props) => {
  const { clientSecret } = props;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeForm;
