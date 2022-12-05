import React, { useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@chakra-ui/react";
import { CartActionType, useCartStore } from "../../context/cart";

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
  const { dispatch: cartDispatch, state: cartState } = cartContext;
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        return_url: "http://localhost:3000/", // TODO: Change to order item page.
      },
    });
    setIsLoading(false);
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      alert(result?.error.message);
    } else {
      cartDispatch({ type: CartActionType.RESET_CART });
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
