
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
// import MKButton from "components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import Hotels from "../Hotels";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

function HotelDetail() {
  return (
    <>
      <MKBox width="100%">
        <DefaultNavbar
          routes={routes}
        />
      </MKBox>

      <Container sx={{ mt: 2 }} className='main-container account-container'>
        <Grid container spacing={2} alignItems="flex-start" sx={{ mt: 6 }} className="account-content" justifyContent="left">
          <Grid item md={3} className="account-col">
            <MKBox display="flex" flexDirection="column" justifyContent="center">
              <MKTypography variant="button h5" color="text" mb={2} >
                Image
              </MKTypography>
              <MKTypography variant="button h5" color="text" mb={2} >
                Hotel Name
              </MKTypography>
              <MKTypography variant="button h5" color="text" mb={2} >
                Hotel Address
              </MKTypography>
              <MKTypography variant="button h5" color="text" mb={2} >
                Room Price
              </MKTypography>
              <MKTypography variant="button h5" color="text" mb={2} >
                Total Rooms
              </MKTypography>
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

export default HotelDetail;

