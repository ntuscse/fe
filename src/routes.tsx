import { Route, Routes as ReactRoutes } from "react-router-dom";
import ConfirmSignUp from "./pages/ConfirmSignUp";
import Home from "./pages/Home"
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import routes from "./utils/constants/routes";

const Routes = () => (
  <ReactRoutes>
    <Route path={routes.HOME} element={<Home />} />
    <Route path={routes.SIGN_IN} element={<SignIn />} />
    <Route path={routes.SIGN_UP} element={<SignUp />} />
    <Route path={routes.CONFIRM_SIGN_UP} element={<ConfirmSignUp />} />
  </ReactRoutes>
);

export default Routes;
