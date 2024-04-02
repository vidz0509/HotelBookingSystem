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

import { hotelsServices } from "services/hotels";

function Pages(props) {

  const [hotelsData, sethotelsData] = useState(null);

  useEffect(() => {

    gethotels(6);

  }, []);

  const gethotels = async (size) => {
    let response = await hotelsServices.getAllHotel(size);
    sethotelsData(response.data);
  }

  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   autoplay: false,
  //   autoplaySpeed: 1000,
  // };

  const renderData = hotelsData && hotelsData?.map((hotels) => (
    <Grid item md={4} sx={{ mb: 2 }} key={hotels._id}>
      <ExampleCard image={hotels.hotel_image[0]} name={hotels.hotel_name} address={hotels.hotel_address} url={`/hotel-details/${hotels._id}`} hideName={false} />
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
            Explore new hotels
          </MKTypography>
          <MKTypography variant="body1" color="text">
            One that&apos;s accessible to all anywhere at affordable prices.
            You can choose tailored travel experiences - whatever you&apos;re looking for, we&apos;ve got it.
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>
        <>
          <Grid container spacing={2}>
            {renderData}
          </Grid>
        </>
      </Container>
    </MKBox>
  );
}

export default Pages;
