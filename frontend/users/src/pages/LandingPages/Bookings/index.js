
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

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import { authServices } from "services/auth";
import { validation } from "services/validation";
import { useState } from "react";
import bgImage from "assets/images/auth.jpg";

// Image
// import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function Bookings() {
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
            <Grid item xs={12} lg={8}>
              <Grid spacing={1} alignItems="flex-start" sx={{ mt: 6 }} className="account-content" justifyContent="left">

                <MKTypography variant="h4"  color="text" className="css-MuiGrid-root">
                  Who&apos;s checking in
                </MKTypography>

                <Grid item md={4} className="account-col">


                  <MKTypography variant="h5" color="text">
                    Room 1
                  </MKTypography>

                  <MKTypography variant="h6" color="text">
                    Adult 1
                  </MKTypography>

                  <Grid item xs={12}>
                    <div className="wrap">
                      <div className="form-control required">
                        <MKTypography>
                          <MKInput>
                          </MKInput>
                          <MKInput>
                          </MKInput>
                          <MKInput>
                          </MKInput>
                          <MKInput>
                          </MKInput>
                        </MKTypography>
                      </div>
                    </div>
                  </Grid>

                  <Grid container item xs={12} mt={5} mb={2}>

                    <MKButton variant="gradient" color="info" type="submit"><span>Proceed to payment</span>
                    </MKButton>

                  </Grid>

                </Grid>
              </Grid >
            </Grid>

            <Grid item xs={10} lg={4} my={3}>
              <Grid container spacing={3} alignItems="center">
                <Container className="main-container">
                  <Grid container spacing={2} alignItems="flex-start" sx={{ mt: 6 }} className="account-content" justifyContent="left">
                    <MKTypography variant="h5" color="text">
                      checking
                    </MKTypography>
                  </Grid>
                </Container>
              </Grid >
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

export default Bookings;
