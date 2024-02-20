import React, { useEffect } from "react";
import { useState } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";
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
    <Grid item xs={12} md={3}  key={amenities._id}>
      <DefaultInfoCard title={amenities.amenities_name} icon="sports_gymnastics" />
    </Grid>
  ));

  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={12} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              {renderData}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
