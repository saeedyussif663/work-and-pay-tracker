import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/ui/layout";
import { checkAuth } from "./lib/check-token";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Payments from "./pages/Payments";
import ResetPassword from "./pages/ResetPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Investment from "./pages/Vehicles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: checkAuth,
      },
      {
        path: "/vehicles",
        element: <Investment />,
        loader: checkAuth,
      },
      {
        path: "/payments",
        element: <Payments />,
        loader: checkAuth,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/forgot-password/:token",
    element: <ResetPassword />,
  },
]);

export default router;
