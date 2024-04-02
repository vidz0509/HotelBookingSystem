
import { useEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "assets/theme";

import routes from "routes";
import Home from "pages/Home";
import AboutUs from "pages/LandingPages/AboutUs";
import ContactUs from "pages/LandingPages/ContactUs";
import SignInPage from "layouts/pages/authentication/sign-in";
import SignUpPage from "layouts/pages/authentication/sign-up";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Home />} />
        <Route path="/SignIn"element={<SignInPage/>} />
        <Route path="/SignUp"element={<SignUpPage/>} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </ThemeProvider>
  );
}
