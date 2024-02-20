import Home from "pages/Home";
import AboutUs from "pages/LandingPages/AboutUs";
import ContactUs from "pages/LandingPages/ContactUs";
import SignIn from "layouts/pages/authentication/sign-in";
import SignUp from "layouts/pages/authentication/sign-up";
import ForgetPassword from "pages/LandingPages/ForgetPassword";
import ChnagePasswordBasic from "pages/LandingPages/ChangePassword";
import { authServices } from './services/auth';
import Hotels from "pages/LandingPages/Hotels";

const routes = [
  {
    name: "Home",
    route: "/",
    component: <Home />,
    addInMenu: true,
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
    component:  authServices.checkIfUserLoggedIn() ? <Home/> : <SignIn/>,
    addInMenu: true,
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
  {
    name: "Hotels List",
    route: "/hotels",
    component: <Hotels />,
    addInMenu: false,
  },
];

export default routes;