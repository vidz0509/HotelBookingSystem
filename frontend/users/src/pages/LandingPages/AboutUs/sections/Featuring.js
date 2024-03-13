
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { hotelsServices } from "services/hotels";
// import { amenitiesServices } from "services/amenities";
import { countriesServices } from "services/countries"
import { locationsServices } from "services/locations"

import MKBox from "components/MKBox";

import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";


function Featuring() {
  const [totalHotels, setTotalHotels] = useState(0);
  const [totalCountries, setTotalCountries] = useState(0);
  const [totalLocations, setTotalLocations] = useState(0);

  useEffect(() => {
    HotelsCount();
  }, []);

  const HotelsCount = async () => {
    const result = await hotelsServices.HotelsCount();
    if (result.isSuccessful) {
      setTotalHotels(result.count);
      console.log(result.count)
    }
  }

  useEffect(() => {
    countryCount();
  }, []);

  const countryCount = async () => {
    const result = await countriesServices.countryCount();
    if (result.isSuccessful) {
      setTotalCountries(result.count);
    }
  }

  useEffect(() => {
    locationCount();
  }, []);

  const locationCount = async () => {
    const result = await locationsServices.locationCount();
    if (result.isSuccessful) {
      setTotalLocations(result.count);
    }
  }
  return (
    <MKBox component="section" pb={6} pt={6}>
      <Container>
      
        <Grid container justifyContent="center" sx={{ textAlign: "center" }}>
         
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
              title={"Countries"}
              description="That meets quality standards required by our users"
              count={totalCountries}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
              title={"Locations"}
              description="That meets quality standards required by our users"
              count={totalLocations}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
            title={"Hotels"}
              description="Of “high-performing” level are led by a certified project manager"
              count={totalHotels}
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
