import React from 'react'
import Register from '../Public/Register'
import Login from '../Public/Login'
import VerifyOTP from '../Public/VerifyOTP'
import Search from '../Public/Search'
import Home from '../Public/Home'
import SellerDashboard from '../Private/Seller/SellerDashboard'
import SellerOrder from './../Private/Seller/SellerOrder';
import Account from './../Private/Common/Account';
import EditProfile from './../Private/Common/EditProfile';
import Cart from './../Private/Customer/Cart';
import Order from './../Private/Customer/Order';
import Wishlist from '../Private/Customer/Wishlist'
import AddStore from '../Private/Seller/AddStore'
import AddAddress from '../Private/Seller/AddAddress'
import AddContact from '../Private/Seller/AddContact'
import UpdateAddress from '../Private/Seller/EditAddress';
import UpdateStore from '../Private/Seller/EditStore'
import UpdateContact from '../Private/Seller/EditContact';
import EditAddress from '../Private/Seller/EditAddress'
import EditStore from '../Private/Seller/EditStore'
import EditContact from '../Private/Seller/EditContact'
import UploadImage from '../Private/Common/UploadImage'
import AddProduct from '../Private/Seller/AddProduct'

const navs = [
    // ----------------------- BEFORE AUTH --------------------------- 
  {
    path: "/seller/register",
    element: <Register role={"SELLER"}/>,
    requireAuth: false,
    isVisibleAfterAuth: false,
    role: "ALL",
  },
  {
    path: "/customer/register",
    element: <Register role={"CUSTOMER"}/>,
    requireAuth: false,
    isVisibleAfterAuth: false,
    role: "ALL",
  },
  {
    path: "/login",
    element: <Login />,
    requireAuth: false,
    isVisibleAfterAuth: false,
    role: "ALL",
  },
  {
    path: "/verify-otp",
    element: <VerifyOTP />,
    requireAuth: false,
    isVisibleAfterAuth: false,
    role: "ALL",
  },
    // -------------------------- BEFORE AND AFTER AUTH ----------------
  {
    path: "/home",
    element: <Home />,
    requireAuth: false,
    isVisibleAfterAuth: true,
    role: "ALL",
  },
  {
    path: "/search",
    element: <Search />,
    requireAuth: false,
    isVisibleAfterAuth: true,
    role: "ALL",
  },
  // ---------------------- COMMON AND AFTER AUTH ----------------------
  {
    path: "/account",
    element: <Account />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "ALL",
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "ALL",
  },
  {
    path: "/upload-image",
    element: <UploadImage />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "ALL",
  },
  // --------------------------- CUSTOMER --------------------------
  {
    path: "/cart",
    element: <Cart />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "CUSTOMER",
  },
  {
    path: "/orders",
    element: <Order />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "CUSTOMER",
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "CUSTOMER",
  },
  // ------------------------- SELLER ----------------------------
  {
    path: "/seller-dashboard",
    element: <SellerDashboard />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "SELLER",
  },
  {
    path: "/add-store",
    element: <AddStore />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "SELLER",
  },
  {
    path: "/add-address",
    element: <AddAddress />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "SELLER",
  },
  {
    path: "/seller-orders",
    element: <SellerOrder />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "SELLER",
  },
  {
    path: "/add-contact",
    element: <AddContact />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "SELLER",
  },
  {
    path: "/edit-store",
    element: <EditStore />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "SELLER",
  },
  {
    path: "/edit-address",
    element: <EditAddress />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "SELLER",
  },
  {
    path: "/edit-contact",
    element: <EditContact />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "SELLER",
  },
  {
    path: "/add-product",
    element: <AddProduct />,
    requireAuth: true,
    isVisibleAfterAuth: true,
    role: "SELLER",
  },

];


export default navs