import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";


// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import { authServices } from "services/auth";
import { Container } from "@mui/material";
import Profile from "./Profile";
import Booking from "./Booking";
import ChangePassword from "./ChangePassword";
import Offers from "./Offers";

export default function Account() {

  const [tabName, setTabName] = useState('profile');

  const handleLogout = async (event) => {
    event.preventDefault();
    await authServices.logout();
    window.location.replace('/sign-in')
  }

  return (
    <>
      <MKBox width="100%" >
        <DefaultNavbar
          routes={routes}
        />
      </MKBox>
      <Container sx={{ mt: 2 }} className='main-container account-container'>
        <Grid container spacing={2} alignItems="flex-start" sx={{ mt: 6 }} className="account-content" justifyContent="center">
          <Grid item md={3} className="account-col">
            <MKBox display="flex" flexDirection="column" justifyContent="center">
              <MKTypography variant="button h5" color="text" mb={2} className={`account-link${tabName === 'profile' ? ' active' : ''}`} onClick={(e) => setTabName('profile')}>
                My Profile
              </MKTypography>
              <MKTypography variant="button h5" color="text" mb={2} className={`account-link${tabName === 'booking' ? ' active' : ''}`} onClick={(e) => setTabName('booking')}>
                My Booking
              </MKTypography>
              <MKTypography variant="button h5" color="text" mb={2} className={`account-link${tabName === 'security' ? ' active' : ''}`} onClick={(e) => setTabName('security')}>
                Security
              </MKTypography>
              <MKTypography variant="button h5" color="text" mb={2} className={`account-link${tabName === 'offers' ? ' active' : ''}`} onClick={(e) => setTabName('offers')}>
                Offers
              </MKTypography>
              <MKTypography color="text" mb={2} onClick={handleLogout} variant="button h5" className='account-link'> Log Out </MKTypography>
            </MKBox>
          </Grid>
          <Grid item md={8} className="account-col">
            {
              tabName === 'profile' && <Profile />
            }
            {
              tabName === 'booking' && <Booking />
            }
            {
              tabName === 'security' && <ChangePassword />
            }
            {
              tabName === 'offers' && <Offers />
            }
          </Grid>
        </Grid>
      </Container>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}
