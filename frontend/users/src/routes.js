import Home from "pages/Home";
import AboutUs from "pages/LandingPages/AboutUs";
import ContactUs from "pages/LandingPages/ContactUs";
import HotelDetail from "pages/LandingPages/HotelDetails";
import SignIn from "layouts/pages/authentication/sign-in";
import SignUp from "layouts/pages/authentication/sign-up";
import ForgetPassword from "pages/LandingPages/ForgetPassword";
import ChnagePasswordBasic from "pages/LandingPages/ChangePassword";
import Account from "pages/LandingPages/Account";
import { authServices } from './services/auth';
import Hotels from "pages/LandingPages/Hotels";
import Bookings from "pages/LandingPages/Bookings";

const routes = [
  {
    name: "Home",
    route: "/",
    component: <Home />,
    addInMenu: true,
  },
  {
    name: "Hotels",
    route: "/hotels",
    component: <Hotels />,
    addInMenu: true,
  },
  {
    name: "Hotel Detail",
    route: "/hotel-details/:id",
    component: <HotelDetail />,
    addInMenu: false,
    secondary: true,
  },
  {
    name: "Bookings",
    route: "/bookings",
    component: <Bookings />,
    addInMenu: false,
  },
  {
    name: "About Us",
    route: "/about-us",
    component: <AboutUs />,
    addInMenu: true,
  },
  {
    name: "Contact Us",
    route: "/contact-us",
    component: <ContactUs />,
    addInMenu: true,
  },
  {
    name: authServices.checkIfUserLoggedIn() ? "Account" : "sign in",
    route: authServices.checkIfUserLoggedIn() ? "/account" : "/sign-in",
    component:  authServices.checkIfUserLoggedIn() ? <Account/> : <SignIn/>,
    addInMenu: true,
    showProfile : authServices.checkIfUserLoggedIn()
  },
  {
    name: "sign up",
    route: "/sign-up",
    component: <SignUp />,
    addInMenu: false,
  },
  {
    name: "Forgot Password",
    route: "/forgetpassword",
    component: <ForgetPassword />,
    addInMenu: false,
  },
  {
    name: "Change Password",
    route: "/changepassword",
    component: <ChnagePasswordBasic />,
    addInMenu: false,
  },
];

export default routes;
