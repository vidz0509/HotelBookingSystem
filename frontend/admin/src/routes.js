import React from "react";

// Admin Imports
import MainDashboard from "views/admin/dashboard";
// import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
// import DataTables from "views/admin/tables";
// import RTLDefault from "views/rtl/default";

// Auth Imports
import LogIn from "views/auth/LogIn";
import ForgotPassword from "views/auth/ForgotPassword";

// Icon Imports
import Customers from "views/admin/customers";
import Bookings from "views/admin/bookings/customers";
import Paymentstatus from "views/admin/payment status/customers";
import Reports from "views/admin/reports/customers";
import Reviews from "views/admin/reviews/customers";
import Changepassword from"views/admin/changepassword";
import {
  MdHome,
  MdOutlineShoppingCart,
  // MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "word",
    layout: "/admin",
    path: "change-password",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Changepassword />,
  },
  {
    name: "Log In",
    layout: "/auth",
    path: "login",
    icon: <MdLock className="h-6 w-6" />,
    component: <LogIn />,
  },
  {
    name: "Forgot Password",
    layout: "/auth",
    path: "forgot-password",
    icon: <MdLock className="h-6 w-6" />,
    component: <ForgotPassword />,
  },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
  {
    name: "Customers",
    layout: "/admin",
    path: "customers",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Customers />,
    secondary: true,
  },
  {
    name: "Bookings",
    layout: "/admin",
    path: "bookings",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Bookings />,
    secondary: true,
  },
  {
    name: "Payment status",
    layout: "/admin",
    path: "Paymentstatus",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Paymentstatus />,
    secondary: true,
  },
  {
    name: "Reports",
    layout: "/admin",
    path: "Reports",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Reports />,
    secondary: true,
  },
  {
    name: "Reviews",
    layout: "/admin",
    path: "Reviews",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Reviews />,
    secondary: true,
  },
];
export default routes;
