/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MKInput
import MKInputRoot from "components/MKInput/MKInputRoot";


const MKInput = forwardRef(({ error, success, disabled, onchange, errorMessage, ...rest }, ref) => (
  <>
    <MKInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled, onchange, errorMessage }} />
    {errorMessage && errorMessage !== '' && <p className="error-msg">{errorMessage}</p>}
  </>
));

// Setting default values for the props of MKInput
MKInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
  onchange: onchange,
  errorMessage: ''
};

// Typechecking props for the MKInput
MKInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  onchange: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default MKInput;
