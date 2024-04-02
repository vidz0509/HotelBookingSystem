import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import { authServices } from "../../services/auth";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [isInnerPage, setIsInnerPage] = React.useState(false);
  const [innerPageText, setInnerPageText] = React.useState('');
  const [parentPageUrl, setParentPageUrl] = React.useState('');
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
    checkIsInnerPage();
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = " Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  const checkIsInnerPage = () => {
    if ((window.location.pathname).includes('add')) {
      setIsInnerPage(true);
      setInnerPageText('Add');
      setParentPageUrl(getParentPageUrl);
    } else if ((window.location.pathname).includes('edit')) {
      setIsInnerPage(true);
      setInnerPageText('Edit');
      setParentPageUrl(getParentPageUrl);
    }else{
      setIsInnerPage(false);
      setInnerPageText('');
      setParentPageUrl('');

    }
  }
  function getParentPageUrl() {
    var stringVariable = window.location.href;
    if ((window.location.pathname).includes('edit')) {
      return stringVariable.substring(0, stringVariable.lastIndexOf('/edit'));
    } else {
      return stringVariable.substring(0, stringVariable.lastIndexOf('/'));
    }
  }

  document.documentElement.dir = "ltr";
  if (!authServices.checkIfUserLoggedIn()) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              isInnerPage={isInnerPage}
              innerPageText={innerPageText}
              parentPageUrl={parentPageUrl}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2 mt-5">
              <Routes>
                {getRoutes(routes)}

                <Route
                  path="/"
                  element={<Navigate to="/auth/login" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
