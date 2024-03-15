
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import Container from "@mui/material/Container";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import btnLoader from "../../../assets/images/button-loader/btn-loader.gif";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import { authServices } from "services/auth";
import { validation } from "services/validation";
import { useState } from "react";
import bgImage from "assets/images/auth.jpg";
import { hotelsServices } from "services/hotels";

// Image
// import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function Bookings() {

  const [bookingData, setBookingData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let bookingData = JSON.parse(localStorage.getItem('bookingData'));
    setBookingData(bookingData);
    getHotelById(bookingData.hotelId);
  }, []);

  const getHotelById = async (hotelId) => {
    const result = await hotelsServices.getHotelById(hotelId);
    if (result.isSuccessful) {
      setLoading(false);
      setHotelData(result.data);
    }
  };

  return (
    <>
      <MKBox width="100%" >
        <DefaultNavbar
          routes={routes}
        />
      </MKBox>

      <Grid container spacing={3} alignItems="center">
        <Container className="main-container">
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Grid spacing={1} alignItems="flex-start" sx={{ mt: 6 }} className="account-content" justifyContent="left" px={3}>

                <MKTypography variant="h4" color="text" className="css-MuiGrid-root">
                  {" Who's checking in"}
                </MKTypography>

                <Grid item className="account-col">
                  {
                    bookingData && bookingData.roomList.length > 0 &&
                    <>
                      {
                        bookingData.roomList.map((room, index) => {
                          return (
                            <MKBox key={`room-${index}`} className="room-item" mt={3}>
                              <MKBox className='room-title'>
                                <MKTypography variant="h5" color="text">{`Room ${index + 1}`}</MKTypography>
                              </MKBox>
                              <MKBox className='adult-details'>
                                {/* <MKBox className='adult-title'>
                                  <MKTypography variant="h6" color="text">Adult Details</MKTypography>
                                </MKBox> */}
                                <MKBox className='adult-info'>
                                  <div className="adult-col">
                                    <input type="text" id={`room-${index + 1}-adult-fname`} placeholder="First Name*" />
                                  </div>
                                  <div className="adult-col">
                                    <input type="text" id={`room-${index + 1}-adult-lname`} placeholder="Last Name*" />
                                  </div>
                                  {index === 0 &&
                                    <>
                                      <div className="adult-col">
                                        <input type="tel" id={`room-${index + 1}-adult-phone`} placeholder="Phone Number" />
                                      </div>
                                      <div className="adult-col">
                                        <input type="email" id={`room-${index + 1}-adult-email`} placeholder="Email*" />
                                      </div>
                                    </>
                                  }
                                </MKBox>
                              </MKBox>
                            </MKBox>
                          )
                        })
                      }
                    </>
                  }

                  <Grid container item xs={12} mt={5} mb={2}>

                    <MKButton variant="gradient" color="info" type="submit"><span>Proceed to payment</span>
                    </MKButton>

                  </Grid>

                </Grid>
              </Grid >
            </Grid>

            <Grid item xs={10} lg={4} my={3}>
              <Grid container spacing={3} alignItems="center">
                <Container className="main-container">
                  <Grid container spacing={2} alignItems="flex-start" sx={{ mt: 6 }} className="account-content" justifyContent="left" px={0}>
                    <MKTypography variant="h5" color="text" px={3}>Hotel Details</MKTypography>
                    {hotelData &&
                      <>
                        <MKBox className="hotel-detail-row info" px={3}>
                          <MKBox className="booking-inner-col">
                            <img decoding="async" src={hotelData.hotel_image[0]} />
                          </MKBox>
                          <MKBox className="booking-inner-col">
                            <MKTypography variant="h6" color="text" mt={2}>{hotelData.hotel_name}</MKTypography>
                            <MKTypography variant="p" className="hotel-address" fontSize={14}>{hotelData.hotel_address}</MKTypography>
                          </MKBox>
                        </MKBox>
                        <MKBox className="hotel-detail-row flex-item dates" px={3} py={2}>
                          <MKBox className="checkin">
                            <MKTypography variant="h6" color="text">Check In</MKTypography>
                            <MKTypography fontSize={14}>30 Mar 2024</MKTypography>
                          </MKBox>
                          <MKBox className="icon">
                            <img decoding="async" src="https://untamed.sourcenettechnology.in/wp-content/themes/untamed/assets/images/checkinout-arrow.svg" />
                          </MKBox>
                          <MKBox className="checkout">
                            <MKTypography variant="h6" color="text">Check Out</MKTypography>
                            <MKTypography fontSize={14}>01 Apr 2024</MKTypography>
                          </MKBox>
                        </MKBox>
                        <MKBox className="hotel-detail-row guests" px={3}>
                          {bookingData && bookingData.roomList.map((room, index) => {
                            return (
                              <MKTypography key={`room-row-${index}`} fontSize={14}>Room {index + 1} : {room.adult} Adult {room.children} Children</MKTypography>
                            )
                          })}
                        </MKBox>
                        <MKBox className="hotel-detail-row flex-item price" px={3}>
                          <MKTypography variant="h4" color="text">Price</MKTypography>
                          <MKTypography variant="h4" color="text">₹1000.00</MKTypography>
                        </MKBox>
                      </>
                    }
                  </Grid>
                </Container>
              </Grid >
            </Grid>
          </Grid>
        </Container>
      </Grid >

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Bookings;
