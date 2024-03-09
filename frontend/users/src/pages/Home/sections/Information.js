import React, { useEffect } from "react";
import { useState } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import { amenitiesServices } from "services/amenities";

function Information() {
  const [amenitiesData, setAmenitiesData] = useState(null);
  useEffect(() => {
    getAmenities();
  }, []);

  const getAmenities = async () => {
    let response = await amenitiesServices.getAllAmenities();
    setAmenitiesData(response.data);
  }

  const renderData = amenitiesData && amenitiesData?.map((amenities) => (
    <Grid item xs={12} md={2} key={amenities._id}>
      <DefaultInfoCard title={amenities.amenities_name} icon={amenities.amenities_icon ? amenities.amenities_icon : "sports_gymnastics"} textAlign="center" />
    </Grid>
  ));

  return (
    <MKBox component="section" >
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 2, py: 6, mx: "auto", px: 0.75 }}
        >
          <MKTypography variant="h2" fontWeight="bold">
            Amenities
          </MKTypography>
          <MKTypography variant="body1" color="text">
            We provided multiple amenities for you to make your self comfortable.
          </MKTypography>
        </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              {renderData}
            </Grid>
          </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
