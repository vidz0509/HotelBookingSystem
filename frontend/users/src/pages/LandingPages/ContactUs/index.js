
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

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
  const handlesubmit = async (event) => {
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
    if (result.isSuccessful) {
      setFullName('');
      setEmail('');
      setMessage('');
      setBtnDisabled(false);
    } else {
      setError(result.errorMessage);
      setBtnDisabled(false);
    }
  }

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%" >
        <DefaultNavbar
          routes={routes}
        // action={{
        //   type: "external",
        //   route: "https://www.creative-tim.com/product/material-kit-react",
        //   label: "free download",
        //   color: "info",
        // }}
        />
      </MKBox>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={6}>
          <MKBox
            display={{ xs: "none", lg: "flex" }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{ backgroundImage: `url(${bgImage})` }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          md={7}
          lg={6}
          xl={4}
          ml={{ xs: "auto", lg: 6 }}
          mr={{ xs: "auto", lg: 6 }}
        >
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
                Contact us
              </MKTypography>
            </MKBox>
            <MKBox p={3}>
              <MKTypography variant="body2" color="text" mb={3}>
                For further questions, including partnership opportunities, please email
                hello@creative-tim.com or contact using our contact form.
              </MKTypography>
              <MKBox width="100%" component="form" method="post" autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
                    <MKInput
                      type="email"
                      variant="standard"
                      label="Email"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      onChange={handleEmailChange}
                      state={emailError !== "" ? "error" : ""}
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
                      rows={6}
                      onChange={handlemessageChange}
                      state={messageError !== "" ? "error" : ""}
                      errorMessage={messageError !== "" ? messageError : ""} />
                  </Grid>
                </Grid>
                <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                  <MKButton variant="gradient" color="info" fullWidth onClick={(e) => handlesubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
                    Send Message
                  </MKButton>
                  <MKButton className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} >
                  </MKButton>
                  <MKBox className="mt-4">
                    {error !== '' && <>
                      <p className="mb-9 ml-1 text-base text-red-500">{error}</p>
                    </>}
                  </MKBox>
                </Grid>
              </MKBox>
            </MKBox>
          </MKBox>
        </Grid>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default ContactUs;
