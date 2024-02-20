import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import logo from "/Pics/amazon.png";

const Header = () => {
  const { auth } = useAuth();
  const { login, role } = auth;

  const navs = [
    {
      buttonName: "Login",
      link: "/login",
      role: "ALL",
      isLogin: false,
    },
    {
      buttonName: "Become a Seller",
      link: "/seller/register",
      role: "ALL",
      isLogin: false,
    },
    {
      buttonName: "Sign Up",
      link: "/customer/register",
      role: "ALL",
      isLogin: false,
    },
    {
      buttonName: "Wishlist",
      link: "/wishlist",
      role: "CUSTOMER",
      isLogin: true,
    },
    {
      buttonName: "Orders",
      link: "/orders",
      role: "CUSTOMER",
      isLogin: true,
    },
    {
      buttonName: "Cart",
      link: "/cart",
      role: "CUSTOMER",
      isLogin: true,
    },
    {
      buttonName: "Account",
      link: "/account",
      role: "ALL",
      isLogin: true,
    },
    {
      buttonName: "Edit Profile",
      link: "/edit-profile",
      role: "ALL",
      isLogin: true,
    },
    {
      buttonName: "Seller Dashboard",
      link: "/seller-dashboard",
      role: "SELLER",
      isLogin: true,
    },
    {
      buttonName: "Seller Orders",
      link: "/seller-orders",
      role: "SELLER",
      isLogin: true,
    }
  ];

  return (
    <header className="head bg-blue-900 flex justify-between items-center h-20 px-8">
      <div className="flex items-center">
        {/* LOGO */}
        <Link to={"/"}>
          <img src={logo} alt="" className="w-24 h-auto text-white" />
        </Link>
      </div>
      {/* SEARCH BAR */}
      <div className="flex flex-grow justify-center mx-8">
        <div className="bg-blue-50 h-10 w-96 max-w-md rounded-sm flex items-center">
          <input
            type="text"
            placeholder="Search for products, categories etc..."
            className="w-full pl-4 pr-8 h-full bg-transparent outline-none text-sm"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="flex">
        {navs.map((button, i) => {
          if (button.isLogin === login && (button.role === "ALL" || button.role === role)) {
            return (
              <Link key={i} to={button.link}>
                <button className="button-blue h-7 w-auto m-2 text-black-700 hover:text-white font-semibold ">
                  {button.buttonName}
                </button>
              </Link>
            );
          }
        })}
      </div>
    </header>
  );
};

export default Header;
