import { Route, Routes as ReactRoutes } from "react-router-dom";
import ConfirmSignUp from "./pages/ConfirmSignUp/ConfirmSignUp";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/Signup/SignUp";
import MerchandiseList from "./pages/MerchandiseList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import OrderHistory from "./pages/OrderHistory";
import MerchDetail from "./pages/MerchDetail";
import routes from "./utils/constants/routes";
import Error404 from "./pages/Error404";

const Routes = () => (
  <ReactRoutes>
    <Route path={routes.HOME} element={<MerchandiseList />} />
    <Route path={routes.SIGN_IN} element={<SignIn />} />
    <Route path={routes.SIGN_UP} element={<SignUp />} />
    <Route path={routes.CONFIRM_SIGN_UP} element={<ConfirmSignUp />} />
    <Route path={routes.CART} element={<Cart />} />
    <Route path={routes.CHECKOUT} element={<Checkout />} />
    <Route path={`${routes.ORDER_SUMMARY}/:slug`} element={<OrderSummary />} />
    <Route path={routes.ORDER_HISTORY} element={<OrderHistory />} />
    <Route path={`${routes.HOME}/:slug`} element={<MerchDetail />} />
    <Route path="*" element={<Error404 />} />
  </ReactRoutes>
);

export default Routes;
