
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import Container from "@mui/material/Container";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import btnLoader from "../../../assets/images/button-loader/btn-loader.gif";
import Swal from "sweetalert2";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import { authServices } from "services/auth";
import { validation } from "services/validation";
import { useState } from "react";
import bgImage from "assets/images/auth.jpg";

// Image
// import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function ContactUs() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fullname, setFullName] = useState('');
  const [fullnameError, setFullNameError] = useState('');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState('');

  const handlefullNameChange = (event) => {
    const value = event.target.value;
    console.log(value)
    setFullName(value);
  }

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  }
  const handlemessageChange = (event) => {
    const value = event.target.value;
    setMessage(value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError('');
    setMessageError('');
    setFullNameError('');

    if (validation.isEmpty(fullname)) {
      setFullNameError("Please enter valid fullname.");
      return false;
    }
    if (validation.isEmpty(email) || !validation.isValidEmail(email)) {
      setEmailError("Please enter valid email address.");
      return false;
    }

    if (validation.isEmpty(message)) {
      setMessageError("Please enter valid message.");
      return false;
    }

    setBtnDisabled(true);
    const requestBody = {
      fullname: fullname,
      email: email,
      message: message,
    };
    const result = await authServices.getintouch(requestBody);
    //   if (result.isSuccessful) {
    //     setFullName('');
    //     setEmail('');
    //     setMessage('');
    //     setBtnDisabled(false);
    //     localStorage.setItem('currentUser', JSON.stringify(result.data));
    //     setTimeout(function () {
    //       setSuccessful("your message  successfully send")
    //     }, 1000);
    //   } else {
    //     setError(result.errorMessage);
    //     setSuccessful(result.errorMessage);
    //     setBtnDisabled(false);
    //   }
    // }
    if (result.isSuccessful) {
      Swal.fire({
        title: "Message Sent!",
        text: "We will get back too you very soon.",
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
      <Grid container spacing={3} alignItems="center">
        <Container className="main-container">
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <MKBox display="flex" className="g-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.17450673144!2d72.86636899999999!3d21.4223848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e94c5603117%3A0xb45130d58c4c3005!2sVIDHYADEEP%20UNIVERSITY!5e0!3m2!1sen!2sin!4v1708964930435!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" />
              </MKBox>
            </Grid>
            <Grid item xs={12} lg={6}>
              <MKBox
                bgColor="white"
                borderRadius="xl"
                shadow="lg"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                mt={{ xs: 20, sm: 18, md: 20 }}
                mb={{ xs: 20, sm: 18, md: 20 }}
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
                  <MKTypography variant="h3" color="white">
                    Get in touch
                  </MKTypography>
                </MKBox>
                <MKBox p={3}>
                  <MKTypography variant="body2" color="text" mb={3}>
                    Are easy to find, so a visitor can quickly get in touch with you.
                  </MKTypography>
                  <MKBox width="100%" component="form" method="post" autoComplete="off">
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <MKInput
                          variant="standard"
                          label="Full Name"
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          onChange={handlefullNameChange}
                          state={fullnameError !== "" ? "error" : ""}
                          errorMessage={fullnameError !== "" ? fullnameError : ""}
                          value={fullname}
                          maxLength={30} />

                      </Grid>
                      <Grid item xs={12}>
                        <MKInput
                          type="email"
                          variant="standard"
                          label="Email"
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          onChange={handleEmailChange}
                          state={emailError !== "" ? "error" : ""}
                          value={email}
                          errorMessage={emailError !== "" ? emailError : ""} />
                      </Grid>
                      <Grid item xs={12}>
                        <MKInput
                          variant="standard"
                          label="What can we help you?"
                          placeholder="Describe your problem in at least 250 characters"
                          InputLabelProps={{ shrink: true }}
                          multiline
                          fullWidth
                          rows={4}
                          onChange={handlemessageChange}
                          state={messageError !== "" ? "error" : ""}
                          value={message}
                          errorMessage={messageError !== "" ? messageError : ""} />
                      </Grid>
                    </Grid>
                    <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                      <MKButton variant="gradient" color="info" fullWidth onClick={(e) => handleSubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
                        {btnDisabled ?
                          <span className="flex items-center justify-center"><img src={btnLoader} className="xxl:max-w-[25px] btn-loader" alt="loader" /></span>
                          : <span>Send Message</span>}
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
      </Grid >
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default ContactUs;
