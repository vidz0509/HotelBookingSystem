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

import Countries from "views/admin/countries";
import AddCountry from "views/admin/countries/add";
import EditCountry from "views/admin/countries/edit";

import Locations from "views/admin/locations";
import AddLocation from "views/admin/locations/add";
import EditLocation from "views/admin/locations/edit"; 

import Bookings from "views/admin/bookings/customers";

import Paymentstatus from "views/admin/payment status/customers";

import Reports from "views/admin/reports/customers";

import Reviews from "views/admin/reviews/customers";

import Changepassword from "views/admin/changepassword";

import {
  MdHome,
  MdSupervisedUserCircle,
  MdMenuBook,
  MdPerson,
  MdLock,
  MdPublic,
  MdPayments,
  MdReport,
  MdRateReview,
  MdMyLocation,
} from "react-icons/md";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
    addInMenu: true,

  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
    addInMenu: false,
  },
  {
    name: "Password",
    layout: "/admin",
    path: "change-password",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Changepassword />,
    addInMenu: false,
  },
  {
    name: "Log In",
    layout: "/auth",
    path: "login",
    icon: <MdLock className="h-6 w-6" />,
    component: <LogIn />,
    addInMenu: false,
  },
  {
    name: "Forgot Password",
    layout: "/auth",
    path: "forgot-password",
    icon: <MdLock className="h-6 w-6" />,
    component: <ForgotPassword />,
    addInMenu: false,
  },
  {
    name: "Customers",
    layout: "/admin",
    path: "customers",
    icon: <MdSupervisedUserCircle className="h-6 w-6" />,
    component: <Customers />,
    secondary: true,
    addInMenu: true,
  },
  {
    name: "Countries",
    layout: "/admin",
    path: "countries",
    icon: <MdPublic className="h-6 w-6  " />,
    component: <Countries />,
    secondary: true,
    addInMenu: true
  },
  {
    name: "Countries",
    layout: "/admin",
    path: "countries/add",
    icon: <MdPublic className="h-6 w-6" />,
    component: <AddCountry />,
    secondary: true,
    addInMenu: false
  },

  {
    name: "Countries",
    layout: "/admin",
    path: "countries/edit/:id",
    icon: <MdPublic className="h-6 w-6" />,
    component: <EditCountry />,
    secondary: true,
    addInMenu: false
  },
  {
    name: "Locations",
    layout: "/admin",
    path: "locations",
    icon: <MdMyLocation className="h-6 w-6" />,
    component: <Locations />,
    secondary: true,
    addInMenu: true,
  },
  {
    name: "Locations",
    layout: "/admin",
    path: "locations/add",
    icon: <MdPublic className="h-6 w-6" />,
    component: <AddLocation />,
    secondary: true,
    addInMenu: false
  },

  {
    name: "Locations",
    layout: "/admin",
    path: "locations/edit/:id",
    icon: <MdPublic className="h-6 w-6" />,
    component: <EditLocation />,
    secondary: true,
    addInMenu: false
  },
  {
    name: "Bookings",
    layout: "/admin",
    path: "bookings",
    icon: <MdMenuBook className="h-6 w-6" />,
    component: <Bookings />,
    secondary: true,
    addInMenu: true,
  },
  {
    name: "Payment status",
    layout: "/admin",
    path: "Paymentstatus",
    icon: <MdPayments className="h-6 w-6" />,
    component: <Paymentstatus />,
    secondary: true,
    addInMenu: true,
  },
  {
    name: "Reports",
    layout: "/admin",
    path: "Reports",
    icon: <MdReport className="h-6 w-6" />,
    component: <Reports />,
    secondary: true,
    addInMenu: true,
  },
  {
    name: "Reviews",
    layout: "/admin",
    path: "Reviews",
    icon: <MdRateReview className="h-6 w-6" />,
    component: <Reviews />,
    secondary: true,
    addInMenu: true,
  },
];
export default routes;
