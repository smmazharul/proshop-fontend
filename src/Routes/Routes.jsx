import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
// import {Products} from "../Pages/Home/Products/Products";
import ProductDetails from "../Pages/Home/ProductDetails/ProductDetails";
import Products from "../Pages/Home/Products/Products";
import Cart from "../Pages/Carts/Cart/Cart";
import Login from "../Pages/LoginLogOut/Login/Login";
import SignUp from "../Pages/LoginLogOut/SignUp/SingUp";
import Shipping from "../Pages/Shipping/Shipping";
import Payment from "../Pages/Payment/Payment";
import PrivateRoute from "./PrivateRoute";
export  const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "product",
        element: <Products></Products>,
      },
      {
        path: "product/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: 'cart',
        element:<Cart></Cart>
      },
      {
        path: 'login',
        element:<Login></Login>
      },
      {
        path: 'signup',
        element:<SignUp></SignUp>
      },
      {
        path: 'shipping',
        element:<PrivateRoute><Shipping></Shipping></PrivateRoute>
      },
      {
        path: 'payment',
        element:<PrivateRoute><Payment></Payment></PrivateRoute>
      } 
    ],
    
  },

]);
