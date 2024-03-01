import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import SimpleFooter from "examples/Footers/SimpleFooter";

import { authServices } from "services/auth";
import { validation } from "services/validation";
import { useState } from "react";
import bgImage from "assets/images/auth.jpg";
import {
  MdRemoveRedEye,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import Swal from "sweetalert2";


function SignUpBasic() {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmpasswordError, setconfirmpasswordError] = useState('');
  const [fullnameError, setFullNameError] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [passwordType, setPasswordType] = useState("password");
  const [confirmpasswordType, setConfirmPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const toggleConfirmPassword = () => {
    if (confirmpasswordType === "password") {
      setConfirmPasswordType("text")
      return;
    }
    setConfirmPasswordType("password")
  }



  const handlefullNameChange = (event) => {
    const value = event.target.value;
    console.log(value)
    setFullName(value);
  }
  const handleEmailChange = (event) => {
    const value = event.target.value;
    console.log(value)
    setEmail(value);
  }

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  }

  const handleconfirmpassworddChange = (event) => {
    const value = event.target.value;
    setconfirmpassword(value);
  }

  const handlesubmit = async (event) => {
    event.preventDefault();
    console.log(event)
    setEmailError('');
    setPasswordError('');
    setFullNameError('');
    setconfirmpasswordError('')

    if (validation.isEmpty(fullname)) {
      setFullNameError("Please enter valid fullname.");
      return false;
    }
    if (validation.isEmpty(email) || !validation.isValidEmail(email)) {
      setEmailError("Please enter valid email address.");
      return false;
    }
    if (validation.isEmpty(password)) {
      setPasswordError("Please enter valid Password.");
      return false;
    }
    if (validation.isEmpty(confirmpassword)) {
      setconfirmpasswordError("Please enter valid confirmPassword.");
      return false;
    }
    if (password !== confirmpassword) {
      setError("New Password and Confirm Password must be same.");
      return false;
    }

    if (confirmpassword.length < 8) {
      setError("Password must be 8 characters long.");
      return false;
    }

    if (!validation.isValidPassword(confirmpassword)) {
      setError("Password must have at least one digit, one special chacter and one uppercase letter");
      return false;
    }
    setBtnDisabled(true);
    const requestBody = {
      fullname: fullname,
      email: email,
      password: password,
      confirmpassword: confirmpassword

    };
    const result = await authServices.register(requestBody);
    if (result.isSuccessful) {
      localStorage.setItem('currentUser', JSON.stringify(result.data));
      Swal.fire({
        title: "Success",
        text: "Register successfully.",
        icon: "success",
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          setBtnDisabled(false);
          window.location.href = '/';
        }
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: result.errorMessage,
        icon: "error",
        allowOutsideClick: false
      })
        .then((result) => {
          if (result.isConfirmed) {
            setBtnDisabled(false);
            window.location.reload();
          }
        });
    }
  }

  return (
    <>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign up
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox mb={2}>
                  <MKInput type="text" label="Full name" fullWidth
                    onChange={handlefullNameChange}
                    state={fullnameError !== "" ? "error" : ""}
                    errorMessage={fullnameError !== "" ? fullnameError : ""}
                    value={fullname}
                    maxLength={30} />

                </MKBox>
                <MKBox mb={2}>
                  <MKInput type="email" label="Email" fullWidth
                    onChange={handleEmailChange}
                    state={emailError !== "" ? "error" : ""}
                    errorMessage={emailError !== "" ? emailError : ""} />

                </MKBox>
                <MKBox mb={2}>
                  <div className={`field${passwordError !== "" ? " has-error" : ""}`}>
                    <MKInput type={passwordType} label="Password" fullWidth
                      onChange={handlePasswordChange}
                      state={passwordError !== "" ? "error" : ""}
                      errorMessage={passwordError !== "" ? passwordError : ""}
                      maxLength={12} />
                    <button className="icon" type="button" onClick={(e) => togglePassword(e)}>{passwordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
                  </div>
                </MKBox>
                <MKBox mb={2}>
                  <div className={`field${confirmpasswordError !== "" ? " has-error" : ""}`}>
                    <MKInput type={confirmpasswordType} label="Confirm password" fullWidth
                      onChange={handleconfirmpassworddChange}
                      state={confirmpasswordError !== "" ? "error" : ""}
                      errorMessage={confirmpasswordError !== "" ? confirmpasswordError : ""}
                      maxLength={12}
                    />
                    <button className="icon" type="button" onClick={(e) => toggleConfirmPassword(e)}>{confirmpasswordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
                  </div>
                </MKBox>
                {/* <MKTypography
                    component={Link}
                    to="#"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                  </MKTypography> */}
                <MKBox mt={4} mb={1}>
                  <MKButton variant="gradient" color="info" fullWidth onClick={(e) => handlesubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
                    sign up
                  </MKButton>
                  <MKButton className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} >
                  </MKButton>
                  <MKBox className="mt-4">
                    {error !== '' && <>
                      <p className="error-msg">{error}</p>
                    </>}
                  </MKBox>
                </MKBox>
                <MKBox mb={1} textAlign="center">
                  <MKTypography variant="button" color="text">
                    Don&apos;t have an account?{" "}
                    <MKTypography
                      component={Link}
                      to="/sign-in"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign in
                    </MKTypography>
                  </MKTypography>
                </MKBox>
                {/* </MKBox> */}
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox >
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignUpBasic;
