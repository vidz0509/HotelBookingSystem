// import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import SimpleFooter from "examples/Footers/SimpleFooter";
import { authServices } from "services/auth";
import { validation } from "services/validation";
import { useState, useEffect } from "react";
import bgImage from "assets/images/auth.jpg";
import {
  MdRemoveRedEye,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import Swal from "sweetalert2";

function ChnagePasswordBasic() {
  const [password, setpassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [passwordType, setPasswordType] = useState("password");
  const [newpasswordType, setNewPasswordType] = useState("password");
  const [confirmpasswordType, setConfirmPasswordType] = useState("password");

  const [passwordError, setpasswordError] = useState('');
  const [newPasswordError, setnewPasswordError] = useState('');
  const [confirmPasswordError, setconfirmPasswordError] = useState('');
  const [isSuccessfull, setSuccessfull] = useState(false);

  const [error, setError] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const toggleNewPassword = (e) => {
    e.preventDefault();
    if (newpasswordType === "password") {
      setNewPasswordType("text")
      return;
    }
    setNewPasswordType("password")
  }

  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    if (confirmpasswordType === "password") {
      setConfirmPasswordType("text")
      return;
    }
    setConfirmPasswordType("password")
  }

  const handlepasswordChange = (event) => {
    clearErrors();
    const value = event.target.value;
    setpassword(value);
  }
  const handlenewPasswordChange = (event) => {
    clearErrors();
    const value = event.target.value;
    setnewPassword(value);
  }
  const handleconfirmPasswordChange = (event) => {
    clearErrors();
    const value = event.target.value;
    setconfirmPassword(value);
  }
  useEffect(() => {
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setpasswordError('');
    setnewPasswordError('');
    setconfirmPasswordError('');
    setError('');
    setSuccessfull('');
    if (validation.isEmpty(password)) {
      setpasswordError("Please enter valid password.");
      return false;
    }
    if (validation.isEmpty(newPassword)) {
      setnewPasswordError("Please enter valid new Password.");
      return false;
    }
    if (validation.isEmpty(confirmPassword)) {
      setconfirmPasswordError("Please enter valid confirmPassword.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password must be same.");
      return false;
    }

    if (confirmPassword.length < 8) {
      setError("Password must be 8 characters long.");
      return false;
    }

    if (!validation.isValidPassword(confirmPassword)) {
      setError("Password must have at least one digit, one special chacter and one uppercase letter");
      return false;
    }
    clearErrors();
    setBtnDisabled(true);
    const currentUser = authServices.getCurrentUser();
    const requestBody = {
      email: currentUser.email,
      password: password,
      newpassword: newPassword,
    };
    setSuccessfull("Password change successfully");
    const result = await authServices.changepassword(requestBody);
    if (result.isSuccessful) {
      Swal.fire({
        title: "Success",
        text: "Password changed successfully.",
        icon: "success",
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          setBtnDisabled(false);
          window.location.reload();
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
  const clearErrors = () => {
    setconfirmPasswordError('');
    setnewPasswordError('');
    setpasswordError('');
    setError('');
    setSuccessfull('');
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
                  Change Password
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                {/* <MKBox component="form" role="form"> */}
                <form method="post" onSubmit={handleSubmit}>
                  <MKBox mb={2}>
                    <div className={`field${passwordError !== "" ? " has-error" : ""}`}>
                      <MKInput type={passwordType} label="Current Password*" fullWidth
                        onChange={handlepasswordChange}
                        state={passwordError !== "" ? "error" : ""}
                        errorMessage={passwordError !== "" ? passwordError : ""}
                        maxLength={12}
                      />
                      <button className="icon" type="button" onClick={(e) => togglePassword(e)}>{passwordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
                    </div>
                  </MKBox>
                  <MKBox mb={2}>
                    <div className={`field${newPasswordError !== "" ? " has-error" : ""}`}>
                      <MKInput type={newpasswordType} label="New Password*" fullWidth
                        onChange={handlenewPasswordChange}
                        state={newPasswordError !== "" ? "error" : ""}
                        errorMessage={newPasswordError !== "" ? newPasswordError : ""}
                        maxLength={12}
                      />
                      <button className="icon" type="button" onClick={(e) => toggleNewPassword(e)}>{newpasswordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
                    </div>
                  </MKBox>
                  <MKBox mb={2}>
                    <div className={`field${confirmPasswordError !== "" ? " has-error" : ""}`}>
                      <MKInput type={confirmpasswordType} label="Re-enter Password*" fullWidth
                        onChange={handleconfirmPasswordChange}
                        state={confirmPasswordError !== "" ? "error" : ""}
                        errorMessage={confirmPasswordError !== "" ? confirmPasswordError : ""}
                        maxLength={12}
                      />
                      <button className="icon" type="button" onClick={(e) => toggleConfirmPassword(e)}>{confirmpasswordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
                    </div>
                  </MKBox>
                  <MKBox mt={4}>
                    <MKButton variant="gradient" color="info" fullWidth onclick={(e) => handleSubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
                      Change Password
                    </MKButton>
                    <MKButton className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} >
                    </MKButton>
                    <MKBox className="mt-4">
                      {error !== '' && <>
                        <p className="error-msg">{error}</p>
                      </>}
                    </MKBox>
                    <MKBox className="mt-4">
                      {isSuccessfull !== '' && <>
                        <p className="mb-9 ml-1 text-base text-green-500">{isSuccessfull}</p>
                      </>}
                    </MKBox> 
                  </MKBox>
                </form>
                {/* </MKBox> */}
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default ChnagePasswordBasic;
