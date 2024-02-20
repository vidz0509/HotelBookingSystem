import React, { useEffect } from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";
import ExampleCard from "pages/Presentation/components/ExampleCard";
import { locationsServices } from "services/locations";
function HotelsList() {
  const [locationsData, setLocationsData] = useState(null);
  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    let response = await locationsServices.getAllLocations();
    setLocationsData(response.data);
  }
  const renderData = locationsData && locationsData?.map((location) => (
    <Grid item md={4} sx={{ mb: 2 }} key={location._id}>
      <ExampleCard image={location.location_image} name={location.location_name} />
    </Grid>
  ));

  return (
    <MKBox component="section" my={6}>
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
          <MKTypography variant="h2" fontWeight="bold">Huge collection of sections</MKTypography>
          <MKTypography variant="body1" color="text">We have created multiple options for you to put together and customise into pixel perfect pages.</MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>
        <Grid
          container
          item
          xs={12}
          lg={3}
          flexDirection="row"
        >
          <MKTypography variant="body1" fontWeight="text">Filters will be added here</MKTypography>
        </Grid>
        <Grid container spacing={2} lg={9}>
          {renderData}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default HotelsList;
