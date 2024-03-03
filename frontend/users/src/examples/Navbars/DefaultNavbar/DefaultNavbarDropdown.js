import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { authServices } from 'services/auth';

function DefaultNavbarDropdown({
  name,
  icon,
  children,
  collapseStatus,
  light,
  href,
  route,
  showProfile,
  collapse,
  ...rest
}) {
  const linkComponent = {
    component: "a",
    href,
    target: "_blank",
    rel: "noreferrer",
  };

  const routeComponent = {
    component: Link,
    to: route,
  };

  const [profileImg, setProfileImg] = useState('');
  const [userName, setUserName] = useState('');
  useEffect(() => {
    if (showProfile) {
      const userData = authServices.getCurrentUser();
      setProfileImg(userData.profileImg);
      setUserName(((userData.fullname).split(' '))[0]);
    }
  }, [])

  return (
    <>
      <MKBox
        {...rest}
        mx={1}
        p={1}
        display="flex"
        alignItems="center"
        color={light ? "white" : "dark"}
        opacity={light ? 1 : 0.6}
        sx={{ cursor: "pointer", userSelect: "none" }}
        {...(route && routeComponent)}
        {...(href && linkComponent)}
        className='header-link'
      >
        {showProfile && profileImg &&
          <>
            <img src={profileImg} alt='User Profile' className='user-profile' />
          </>
        }
        <MKTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          className={window.location.pathname === route ? "active" : "dark"}
          sx={{ fontWeight: "bold", ml: 1, mr: 0.25, fontSize: "16px" }}
        >
          {showProfile && userName !== '' ? userName : name}
        </MKTypography>
        <MKTypography variant="body2" color={light ? "white" : "dark"} ml="auto">
          <Icon sx={{ fontWeight: "normal", verticalAlign: "middle" }}>
            {collapse && "keyboard_arrow_down"}
          </Icon>
        </MKTypography>
      </MKBox>
      {children && (
        <Collapse in={Boolean(collapseStatus)} timeout={400} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Setting default values for the props of DefaultNavbarDropdown
DefaultNavbarDropdown.defaultProps = {
  children: false,
  collapseStatus: false,
  light: false,
  href: "",
  route: "",
};

// Typechecking props for the DefaultNavbarDropdown
DefaultNavbarDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node,
  collapseStatus: PropTypes.bool,
  showProfile: PropTypes.bool,
  light: PropTypes.bool,
  href: PropTypes.string,
  route: PropTypes.string,
  collapse: PropTypes.bool.isRequired,
};

export default DefaultNavbarDropdown;
