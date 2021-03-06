import { Route, Routes as ReactRoutes } from "react-router-dom";
import ConfirmSignUp from "./pages/ConfirmSignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MerchandiseList from "./pages/MerchandiseList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import OrderHistory from "./pages/OrderHistory";
import MerchDetail from "./pages/MerchDetail";
import routes from "./utils/constants/routes";

const Routes = () => (
  <ReactRoutes>
    <Route path={routes.HOME} element={<Home />} />
    <Route path={routes.SIGN_IN} element={<SignIn />} />
    <Route path={routes.SIGN_UP} element={<SignUp />} />
    <Route path={routes.CONFIRM_SIGN_UP} element={<ConfirmSignUp />} />
    <Route path={routes.MERCHANDISE_LIST} element={<MerchandiseList />} />
    <Route path={routes.CART} element={<Cart />} />
    <Route path={routes.CHECKOUT} element={<Checkout />} />
    <Route path={routes.ORDER_SUMMARY} element={<OrderSummary />} />
    <Route path={routes.ORDER_HISTORY} element={<OrderHistory />} />
    <Route path={routes.ORDER_HISTORY} element={<OrderHistory />} />
    <Route
      path={`${routes.MERCH_DETAIL}/:merchSlug`}
      element={<MerchDetail />}
    />
  </ReactRoutes>
);

export default Routes;
