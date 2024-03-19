import React, { useEffect } from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import HotelsList from "./HotelsList";
import SearchForm from "pages/Presentation/sections/SearchForm";
import routes from "routes";
import footerRoutes from "footer.routes";
import bgImage from "assets/images/vestrahorn.webp";
import { hotelsServices } from "services/hotels";

function Hotels() {
  const [hotelsData, setHotelsData] = useState(null);
  const [searchBody, setSearchBody] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let body = {
      country_id: params.get('country_id') ? params.get('country_id') : '',
      location_id: params.get('location_id') ? params.get('location_id') : '',
      check_in: params.get('check_in') ? params.get('check_in') : '',
      check_out: params.get('check_out') ? params.get('check_out') : '',
    }
    setSearchBody(body);
  }, []);

  useEffect(() => {
    searchHotels();
  }, [searchBody])

  const searchHotels = async () => {
    if (searchBody) {
      let response = await hotelsServices.searchHotels(searchBody);
      if (response.isSuccessful) {
        setHotelsData(response.data);
        setIsLoading(false);
      } else {
        setError(response.errorMessage);
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%">
        <DefaultNavbar
          routes={routes}
          sticky
        />
      </MKBox>
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Luxury Hotels{" "}
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              The Best Place In Town To Relax, To Enjoy Heaven
            </MKTypography>
          </Grid>
          <Grid container item xs={12} lg={10} justifyContent="center" mx="auto" className="form-wrap">
            {!isLoading && <SearchForm searchData={searchBody} />}
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        {!isLoading && <HotelsList hotelsData={hotelsData} searchData={searchBody} />}
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Hotels;
