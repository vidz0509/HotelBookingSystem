import React, { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";

import ExampleCard from "pages/Presentation/components/ExampleCard";

import { countriesServices } from "services/countries";

function DesignBlocks(props) {
  
  const [countriesData, setcountriesData] = useState(null);

  useEffect(() => {

    getcountries(6);

  }, []);

  const getcountries = async (size) => {
    let response = await countriesServices.getAllCountries(size);
    setcountriesData(response.data);
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1000,
  };

  const renderData = countriesData && countriesData?.map((country) => (
    <Grid item md={4} sx={{ mb: 2 }} key={country._id}>
      <ExampleCard image={country.country_image} name={country.country_name} url={`/hotels?country_id=${country._id}`}  hideName={true} />
    </Grid>
  ));

  return (
    <MKBox component="section"
      py={12}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={7}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 1, mx: "auto", px: 0.75 }}
        >
          <MKTypography variant="h2" fontWeight="bold">
            Explore new countries 
          </MKTypography>
          <MKTypography variant="body1" color="text">
            One that&apos;s accessible to all anywhere at affordable prices.
            You can choose tailored travel experiences - whatever you&apos;re looking for, we&apos;ve got it.
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>
        {props.isSlider ? <Slider {...settings}>{renderData}</Slider> :
          <>
            <Grid container spacing={2}>
              {renderData}
            </Grid>
          </>}
      </Container>
    </MKBox>
  );
}

export default DesignBlocks;
