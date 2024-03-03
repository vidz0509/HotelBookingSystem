import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import btnLoader from "../../../assets/images/button-loader/btn-loader.gif";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import { authServices } from "services/auth";
import { validation } from "services/validation";
import { useState } from "react";
import Swal from "sweetalert2";
import { Container } from "@mui/material";
// import bgImage from "assets/images/auth.jpg";

// Image
// import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function Account() {
  const userData = authServices.getCurrentUser();
  const [email, setEmail] = useState(userData.email ? userData.email : '');
  const [fullname, setFullname] = useState(userData.fullname ? userData.fullname : '');
  const [phone, setContact] = useState(userData.phone ? userData.phone : '');
  const [profileImg, setProfileImage] = useState('');

  const [emailError, setEmailError] = useState('');
  const [fullnameError, setFullNameError] = useState('');
  const [contactError, setContactError] = useState('');

  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleLogout = async (event) => {
    event.preventDefault();
    await authServices.logout();
    window.location.replace('/sign-in')
  }

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    setFullname(value);
  }

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  }

  const handleContactChange = (event) => {
    const value = event.target.value;
    setContact(value);
  }

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  }

  const handleSubmit = async (event) => {
    let isValid = false;
    event.preventDefault();
    setEmailError('');
    setFullNameError('');
    setContactError('');
    setError('');
    setSuccessful('');
    if (validation.isEmpty(fullname)) {
      setFullNameError("Please enter valid fullname.");
      return false;
    }
    if (validation.isEmpty(email) || !validation.isValidEmail(email)) {
      setEmailError("Please enter valid email address.");
      return false;
    }
    if (validation.isEmpty(phone) || !validation.isValidPhoneNo(phone)) {
      setContactError("Please enter valid phone no.");
      return false;
    }


    setBtnDisabled(true);
    const requestBody = {
      fullname: fullname,
      email: email,
      phone: phone
    };

    const currentUser = authServices.getCurrentUser();
    const result = await authServices.updateProfile(currentUser._id, requestBody);
    if (result.isSuccessful) {
      if (profileImg !== '' && profileImg != null) {
        const formData = new FormData();
        formData.append("file", profileImg);
        const imageResponse = await authServices.uploadUserProfile(formData);
        if (imageResponse.isSuccessful) {
          localStorage.setItem('currentUser', JSON.stringify(imageResponse.data));
          isValid = true;
        } else {
          isValid = false;
        }
      } else {
        isValid = true;
        localStorage.setItem('currentUser', JSON.stringify(result.data));
      }
      if (isValid) {
        Swal.fire({
          title: "Updated",
          text: "Profile has been updated successfully.",
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
          text: 'Something went wrong.',
          icon: "error",
          allowOutsideClick: false
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: result.errorMessage,
        icon: "error",
        allowOutsideClick: false
      });
    }
  }
  return (
    <>
      <MKBox width="100%" >
        <DefaultNavbar
          routes={routes}
        />
      </MKBox>
      <Container sx={{ mt: 6 }} className='main-container account-container'>
      <Grid container spacing={3} alignItems="baseline">
        <Grid item md={3} className="account-col">
          <MKBox p={3}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 2 }}
            mb={{ xs: 20, sm: 18, md: 30 }}
            mx={3}>
            <MKTypography variant="button h5" color="text" mb={3} fullWidth
              component={Link}
              to="/account"
              >
              My Account
            </MKTypography>
            <MKTypography variant="button h5" color="text" mb={3}>
              My Booking
            </MKTypography>
            <MKTypography variant="button h5" color="text" mb={3}
              component={Link}
              to="/changepassword">
              Security
            </MKTypography>
            <MKTypography color="text" mb={3} fullWidth onClick={handleLogout}
              component={Link}
              to="/sign-in"
              variant="button h5">
              Log Out
            </MKTypography>
          </MKBox>
        </Grid>
        <Grid item md={9} className="account-col">
          <MKBox
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ md: 20 }}
            mb={{ md: 20 }}
            mx={3}
          >
            <MKBox
              variant="gradient"
              bgColor="info"
              coloredShadow="info"
              borderRadius="lg"
              p={2}
              mx={2}
              mt={-3}
            >
              <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Profile
              </MKTypography>
            </MKBox>
            <MKBox p={3}>
              <MKBox width="100%" component="form" method="post" autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MKInput
                      variant="standard"
                      label="Full Name*"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      onChange={handleFullNameChange}
                      state={fullnameError !== "" ? "error" : ""}
                      errorMessage={fullnameError !== "" ? fullnameError : ""}
                      value={fullname}
                      maxLength={30} />

                  </Grid>
                  <Grid item xs={12}>
                    <MKInput
                      type="email"
                      variant="standard"
                      label="Email*"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      onChange={handleEmailChange}
                      state={emailError !== "" ? "error" : ""}
                      value={email}
                      errorMessage={emailError !== "" ? emailError : ""} />
                  </Grid>
                  <Grid item xs={12}>
                    <MKInput
                      type="text"
                      variant="standard"
                      label="Phone no"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      onChange={handleContactChange}
                      state={contactError !== "" ? "error" : ""}
                      value={phone}
                      errorMessage={contactError !== "" ? contactError : ""} />
                  </Grid>
                  <Grid item xs={12}>
                    {userData?.profileImg && userData?.profileImg !== '' &&
                      <Grid className="mb-3 w-2/4">
                        <img src={userData?.profileImg} className="customImage" alt={fullname} />
                      </Grid>
                    }
                    <MKInput
                      type="file"
                      variant="standard"
                      extra="mb-3"
                      label="Profile img"
                      placeholder="Profile img"
                      id="image"
                      onChange={handleProfileImageChange}
                    />
                  </Grid>
                </Grid>
                <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                  <MKButton variant="gradient" color="info" fullWidth onClick={(e) => handleSubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
                    {btnDisabled ?
                      <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px] btn-loader" alt="loader" /></span>
                      : <span>Save Profile</span>}
                  </MKButton>
                  <MKBox className="mt-4">
                    {error !== '' && <>
                      <p className="mb-9 ml-1 text-base text-red-500">{error}</p>
                    </>}
                  </MKBox>
                  <MKBox className="mt-4">
                    {successful !== '' && <>
                      <p className="mb-9 ml-1 text-base text-green-500">{successful}</p>
                    </>}
                  </MKBox>
                </Grid>
              </MKBox>
            </MKBox>
          </MKBox>
        </Grid>
      </Grid>
      </Container>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Account;
