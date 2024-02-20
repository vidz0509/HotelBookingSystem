import React, { useEffect } from "react";
import { useState } from "react";
// import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";

// Presentation page components
import ExampleCard from "pages/Presentation/components/ExampleCard";

// Data
// import data from "pages/Presentation/sections/data/designBlocksData";
import { locationsServices } from "services/locations";



function DesignBlocks() {
  const [locationsData, setLocationsData] = useState(null);
  
  useEffect(() => {
    getLocations(6);
  }, []);
  
  const getLocations = async (size) => {
    let response = await locationsServices.getAllLocations(size);
    setLocationsData(response.data);
  }
  const renderData = locationsData && locationsData?.map((location) => (
    // <Grid container spacing={3} sx={{ mb: 10 }} key={location._id}>
    //   <Grid item xs={12} lg={12}>
    //     <Grid container spacing={3}>
            <Grid item md={4} sx={{ mb: 2 }} key={location._id}>
                <ExampleCard image={location.location_image} name={location.location_name} />
              {/* <Link to={pro ? "/" : route}>
              </Link> */}
            </Grid>
    //     </Grid>
    //   </Grid>
    // </Grid>
  ));

  return (
    <MKBox component="section"
      my={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 1, mx: "auto", px: 0.75 }}
        >
          <MKBadge
            variant="contained"
            color="info"
            container
            sx={{ mb: 2 }}
          />
          <MKTypography variant="h2" fontWeight="bold">
            Huge collection of sections
          </MKTypography>
          <MKTypography variant="body1" color="text">
            We have created multiple options for you to put together and customise into pixel
            perfect pages.
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>
      <Grid container spacing={2}>{renderData}
      </Grid></Container>
    </MKBox>
  );
}

export default DesignBlocks;
