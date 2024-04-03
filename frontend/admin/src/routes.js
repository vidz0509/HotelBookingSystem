import React from "react";

import MainDashboard from "views/admin/dashboard";
import Profile from "views/admin/profile";

import LogIn from "views/auth/LogIn";
import ForgotPassword from "views/auth/ForgotPassword";

import Customers from "views/admin/customers";

import Countries from "views/admin/countries";
import AddCountry from "views/admin/countries/add";
import EditCountry from "views/admin/countries/edit";

import Locations from "views/admin/locations";
import AddLocation from "views/admin/locations/add";
import EditLocation from "views/admin/locations/edit"; 

import Hotels from "views/admin/hotels";
import AddHotel from "views/admin/hotels/add";
import EditHotel from "views/admin/hotels/edit"; 

import Amenities from "views/admin/amenities";
import AddAmenities from "views/admin/amenities/add";
import EditAmenities from "views/admin/amenities/edit"; 

import Offers from "views/admin/offers";
import AddOffers from "views/admin/offers/add";
import EditOffers from "views/admin/offers/edit";

import Rooms from "views/admin/rooms";
import AddRoom from "views/admin/rooms/add";
import EditRoom from "views/admin/rooms/edit";

import RoomType from "views/admin/roomtype";
import AddRoomType from "views/admin/roomtype/add";
import EditRoomType from "views/admin/roomtype/edit"; 

import Bookings from "views/admin/bookings/customers";


import Reviews from "views/admin/reviews/customers";

import Changepassword from "views/admin/changepassword";

import {
  MdHome,
  MdSupervisedUserCircle,
  MdMenuBook,
  MdPerson,
  MdLock,
  MdPublic,
  MdHotelClass,
  MdRoom,
  MdBedroomParent,
  MdWifi,
  MdLocalOffer,
  MdHotel,
  MdRateReview,
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
    icon: <MdRoom className="h-6 w-6" />,
    component: <Locations />,
    secondary: true,
    addInMenu: true,
  },
  {
    name: "Locations",
    layout: "/admin",
    path: "locations/add",
    icon: <MdRoom className="h-6 w-6" />,
    component: <AddLocation />,
    secondary: true,
    addInMenu: false
  },

  {
    name: "Locations",
    layout: "/admin",
    path: "locations/edit/:id",
    icon: <MdRoom className="h-6 w-6" />,
    component: <EditLocation />,
    secondary: true,
    addInMenu: false
  },
  
  {
    name: "Rooms",
    layout: "/admin",
    path: "rooms",
    icon: <MdBedroomParent className="h-6 w-6" />,
    component: <Rooms />,
    secondary: true,
    addInMenu: true,
  },
  {
    name: "Rooms",
    layout: "/admin",
    path: "rooms/add",
    icon: <MdBedroomParent className="h-6 w-6" />,
    component: <AddRoom/>,
    secondary: true,
    addInMenu: false
  },

  {
    name: "Rooms",
    layout: "/admin",
    path: "rooms/edit/:id",
    icon: <MdBedroomParent className="h-6 w-6" />,
    component: <EditRoom/>,
    secondary: true,
    addInMenu: false
  },
  {
    name: "Room types",
    layout: "/admin",
    path: "roomtypes",
    icon: <MdHotel className="h-6 w-6" />,
    component: <RoomType />,
    secondary: true,
    addInMenu: true,
  },
  {
    name: "Room types",
    layout: "/admin",
    path: "roomtypes/add",
    icon: <MdHotel className="h-6 w-6" />,
    component: <AddRoomType />,
    secondary: true,
    addInMenu: false
  },

  {
    name: "Room types",
    layout: "/admin",
    path: "roomtypes/edit/:id",
    icon: <MdHotel className="h-6 w-6" />,
    component: <EditRoomType />,
    secondary: true,
    addInMenu: false
  },
  
  {
    name: "Hotels",
    layout: "/admin",
    path: "hotels",
    icon: <MdHotelClass className="h-6 w-6" />,
    component: <Hotels />,
    secondary: true,
    addInMenu: true,
  },
  {
    name: "Hotels",
    layout: "/admin",
    path: "hotels/add",
    icon: <MdHotelClass className="h-6 w-6" />,
    component: <AddHotel />,
    secondary: true,
    addInMenu: false
  },

  {
    name: "Hotels",
    layout: "/admin",
    path: "hotels/edit/:id",
    icon: <MdHotelClass className="h-6 w-6" />,
    component: <EditHotel />,
    secondary: true,
    addInMenu: false
  },
  
  {
    name: "Amenities",
    layout: "/admin",
    path: "amenities",
    icon: <MdWifi className="h-6 w-6" />,
    component: <Amenities />,
    secondary: true,
    addInMenu: true,
  },
  {
    name: "Amenities",
    layout: "/admin",
    path: "amenities/add",
    icon: <MdWifi className="h-6 w-6" />,
    component: <AddAmenities />,
    secondary: true,
    addInMenu: false
  },
  {
    name: "Amenities",
    layout: "/admin",
    path: "amenities/edit/:id",
    icon: <MdWifi className="h-6 w-6" />,
    component: <EditAmenities />,
    secondary: true,
    addInMenu: false
  },
  {
    name: "Offers",
    layout: "/admin",
    path: "offers",
    icon: <MdLocalOffer className="h-6 w-6" />,
    component: <Offers />,
    secondary: true,
    addInMenu: true
  },
  {
    name: "Offers",
    layout: "/admin",
    path: "offers/add",
    icon: <MdLocalOffer className="h-6 w-6" />,
    component: <AddOffers />,
    secondary: true,
    addInMenu: false
  },
  {
    name: "Offers",
    layout: "/admin",
    path: "offers/edit/:id",
    icon: <MdLocalOffer className="h-6 w-6" />,
    component: <EditOffers />,
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
    name: "Reviews",
    layout: "/admin",
    path: "reviews/customer",
    icon: <MdRateReview className="h-6 w-6" />,
    component: <Reviews />,
    secondary: true,
    addInMenu: true,
  },
];
export default routes;
