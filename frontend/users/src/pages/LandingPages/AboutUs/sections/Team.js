/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";

// Images
import team1 from "assets/images/team1.jpg";
import team2 from "assets/images/team3.jpg";
import team3 from "assets/images/team2.jpg";



function Team() {
  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      mt={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
              The Executive Team
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              There&apos;s nothing I really wanted to do in life that I wasn&apos;t able to get good
              at. That&apos;s my skill.
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team3}
                name="Yash Bhimani"
                position={{ color: "info", label: "Developer" }}
                description="I am an innovative developer experienced in Angular and React.."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={4}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team2}
                name="Virag Bavadiya"
                position={{ color: "info", label: "Developer" }}
                description="I develop dynamic and responsive interfaces that meet client needs.."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={4}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team1}
                name="Darshan Mangukiya"
                position={{ color: "info", label: "Designer" }}
                description="A graphic designer is a professional who uses their artistic abilities"
              />
            </MKBox>
          </Grid>
        
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
