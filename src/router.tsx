import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/ui/layout';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Investment from './pages/Investment';
import Payments from './pages/Payments';
import ResetPassword from './pages/ResetPassword';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AuthLayout from './components/ui/auth-layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/investment',
        element: <Investment />,
      },
      {
        path: '/payments',
        element: <Payments />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/forgot-password/:token',
        element: <ResetPassword />,
      },
    ],
  },
]);

export default router;
