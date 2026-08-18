import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./components/ui/layout";
import { TOKEN_KEY } from "./context/auth-constants";
import { checkAuth } from "./lib/check-token";
import token from "./lib/token";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Payments from "./pages/Payments";
import ResetPassword from "./pages/ResetPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Investment from "./pages/Vehicles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello</h1>,
    loader: () => {
      throw redirect("/dashboard");
    },
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
    loader: () => {
      const authToken = token.get(TOKEN_KEY);
      if (authToken) throw redirect("/dashboard");
    },
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
