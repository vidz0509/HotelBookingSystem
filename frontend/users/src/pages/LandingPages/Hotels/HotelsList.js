import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";
import ExampleCard from "pages/Presentation/components/ExampleCard";
import { Link } from "react-router-dom";
function HotelsList(props) {
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
        <Grid container spacing={3} className="hotel-listing-main">
          <div className="filter-wrapper">
            <div className="filter-head">
              <h5 className="filter-title">Filters</h5>
              <a href="javascript(0);" className="clear-filters">Clear All</a>
            </div>
            <div className="filter-options">
              <div className="option-row">
                <div className="title">
                  <span className="icon" name="caret-right"></span>
                  <h5>Room Types</h5>
                </div>
                <div className="options default-opts">
                  <div className="opt">
                    <label className="opt-label checkbox-label">
                      <input type="checkbox" value="W" name="accomodations[]" />
                      <p className="opt-text">Resort</p>
                    </label>
                  </div>
                  <div className="opt">
                    <label className="opt-label checkbox-label">
                      <input type="checkbox" value="W" name="accomodations[]" />
                      <p className="opt-text">Resort</p>
                    </label>
                  </div>
                  <div className="opt">
                    <label className="opt-label checkbox-label">
                      <input type="checkbox" value="W" name="accomodations[]" />
                      <p className="opt-text">Resort</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="option-row">
                <div className="title">
                  <span className="icon" name="caret-right"></span>
                  <h5>Price</h5>
                </div>
                <div className="options default-opts">
                </div>
              </div>
              <div className="option-row">
                <div className="title">
                  <span className="icon" name="caret-right"></span>
                  <h5>Amenities</h5>
                </div>
                <div className="options default-opts">
                  <div className="opt">
                    <label className="opt-label checkbox-label">
                      <input type="checkbox" value="W" name="accomodations[]" />
                      <p className="opt-text">Free Breakfast</p>
                    </label>
                  </div>
                  <div className="opt">
                    <label className="opt-label checkbox-label">
                      <input type="checkbox" value="W" name="accomodations[]" />
                      <p className="opt-text">Free Breakfast</p>
                    </label>
                  </div>
                  <div className="opt">
                    <label className="opt-label checkbox-label">
                      <input type="checkbox" value="W" name="accomodations[]" />
                      <p className="opt-text">Free Breakfast</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Grid container spacing={2} lg={9} className="hotels-wrapper">
            {props.hotelsData && props.hotelsData?.map((hotel) => (
              <Grid item md={4} sx={{ mb: 2 }} key={hotel._id} className="hotel-item">
                <MKBox position="relative">
                  <MKBox
                    className="hotel-image"
                    component="img"
                    src={hotel.hotel_image[0]}
                    alt={hotel.hotel_name}
                    width="100%"
                    my="auto"
                    opacity={1}
                  />
                  <Link to={`/hotel-details/${hotel._id}`}>
                    <MKBox mt={2} lineHeight={1}>
                      <MKTypography variant="h5" fontWeight="bold" className="hotel-title">
                        {hotel.hotel_name}
                      </MKTypography>
                      <MKTypography variant="p" className="hotel-location">
                        {hotel.location_details[0].location_name}
                      </MKTypography>
                    </MKBox>
                  </Link>
                </MKBox>
              </Grid>
            ))
            }
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default HotelsList;
