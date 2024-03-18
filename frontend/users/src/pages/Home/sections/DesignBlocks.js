import React, { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

function DesignBlocks(props) {
  const [locationsData, setLocationsData] = useState(null);

  useEffect(() => {
    getLocations(6);
  }, []);

  const getLocations = async (size) => {
    let response = await locationsServices.getAllLocations(size);
    setLocationsData(response.data);
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

  const renderData = locationsData && locationsData?.map((location) => (
    <Grid item md={4} sx={{ mb: 2 }} key={location._id}>
      <ExampleCard image={location.location_image} name={location.location_name} hideName={true} />
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
