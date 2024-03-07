
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { hotelsServices } from "services/hotels";
import { amenitiesServices } from "services/amenities";

import MKBox from "components/MKBox";

import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";


function Featuring() {
  const [totalHotels, setTotalHotels] = useState(0);
  const [totalAmenities, setTotalAmenities] = useState(0);
  useEffect(() => {
    HotelsCount();
  }, []);

  const HotelsCount = async () => {
    const result = await hotelsServices.HotelsCount();
    if (result.isSuccessful) {
      setTotalHotels(result.count);
    }
  }

  useEffect(() => {
    AmenitiesCount();
  }, []);

  const AmenitiesCount = async () => {
    const result = await amenitiesServices.AmenitiesCount();
    if (result.isSuccessful) {
      setTotalAmenities(result.count);
    }
  }
  return (
    <MKBox component="section" pt={12}>
      <Container>
      
        <Grid container justifyContent="center" sx={{ textAlign: "center" }}>
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
            title={"Hotels"}
              description="Of “high-performing” level are led by a certified project manager"
              subtitle={totalHotels}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
              title={"Amenities"}
              description="That meets quality standards required by our users"
              subtitle={totalAmenities}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
              count={24}
              suffix="/7"
              title="Support"
              description="Actively engage team members that finishes on time"
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Featuring;
