
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
// import btnLoader from "../../../assets/images/button-loader/btn-loader.gif";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import { useState } from "react";
import { authServices } from "services/auth";
import { validation } from "services/validation";

import bgImage from "assets/images/auth.jpg";
import { hotelsServices } from "services/hotels";
import { bookingsServices } from "services/bookings";
import { check } from "prettier";
import { offersServices } from "services/offers";

// Image
// import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function Bookings() {

  const [bookingData, setBookingData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [offerData, setOfferData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState([]);
  const [contactError, setContactError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [error, setError] = useState('');


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
      setError(result.errorMessage);
      setBtnDisabled(false);
    }
  };

  useEffect(() => {
    let offerData = JSON.parse(localStorage.getItem('offerData'));
    getOffersByCode();
  }, []);

  const getOffersByCode = async () => {
    let response = await offersServices.getOffersByCode();
    setOfferData(response.data);
  };

  const handleOfferCodeChange = (event) => {
    const value = event.target.value;
    setOfferData(value);
  }

  const handleUserDetailsChange = (event) => {
    const value = event.target.value;
    const index = parseInt(event.target.getAttribute('data-index'));
    const fieldType = event.target.getAttribute('data-field');
    const updatedUserDetails = [...userDetails];
    updatedUserDetails[index] = {
      ...updatedUserDetails[index],
      [fieldType]: value
    };
    setUserDetails(updatedUserDetails);
  }

  const handlesubmit = async (event) => {
    event.preventDefault();
    setBtnDisabled(true);
    const currentUser = authServices.getCurrentUser();
    let requestBody = {
      check_in: bookingData.check_in,
      check_out: bookingData.check_out,
      user_id: currentUser._id,
      hotelId: bookingData.hotelId,
      roomList: bookingData.roomList,
      finalSelectedRooms: bookingData.finalSelectedRooms,
      user_detail: userDetails,
    }
    console.log(requestBody);
    const result = await bookingsServices.payment(requestBody);
    if (result.isSuccessful) {
      localStorage.setItem('bookingData', null);
      window.location.href = result.data.checkout_url;
    } else {
      setError(result.errorMessage);
      setBtnDisabled(false);
    }
  }

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
                                    <input type="text" id={`room-${index + 1}-adult-fname`} placeholder="First Name*" data-index={index} data-field={'firstname'}
                                      onBlur={handleUserDetailsChange}
                                    />
                                  </div>
                                  <div className="adult-col">
                                    <input type="text" id={`room-${index + 1}-adult-lname`} placeholder="Last Name*" data-field={'lastname'} data-index={index}
                                      onBlur={handleUserDetailsChange}
                                    />
                                  </div>
                                  {index === 0 &&
                                    <>
                                      <div className="adult-col">
                                        <input type="tel" id={`room-${index + 1}-adult-phone`} placeholder="Phone Number" data-index={index} data-field={'contact'}
                                          onBlur={handleUserDetailsChange} />
                                        {contactError && <p className="error">{contactError}</p>}

                                      </div>
                                      <div className="adult-col">
                                        <input type="email" id={`room-${index + 1}-adult-email`} placeholder="Email*" data-index={index} data-field={'email'}
                                          onBlur={handleUserDetailsChange}
                                        />
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

                  <MKBox className="room-item" mt={3}>
                    <MKBox className='room-title'>
                      <MKTypography variant="h5" color="text">Discount Coupon</MKTypography>
                    </MKBox>
                  </MKBox>
                  <MKBox className='adult-info adult-col'>
                    <div className="adult-col">
                      <input type="text" id="offer code" placeholder="Enter Coupon Code*" data-field={''}
                      />
                    </div>
                    <MKButton variant="gradient" color="info" onClick={(e) => handleOfferCodeChange(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}><span>Apply Coupon</span>
                    </MKButton>
                  </MKBox>
                  <Grid container item xs={12} mt={5} mb={2}>

                    <MKButton variant="gradient" color="info" fullWidth onClick={(e) => handlesubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}><span>Proceed to payment</span>
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
                            <MKTypography fontSize={14}>{bookingsServices.formatDate(bookingData.check_in)}</MKTypography>
                          </MKBox>
                          <MKBox className="icon">
                            <img decoding="async" src="https://untamed.sourcenettechnology.in/wp-content/themes/untamed/assets/images/checkinout-arrow.svg" />
                          </MKBox>
                          <MKBox className="checkout">
                            <MKTypography variant="h6" color="text">Check Out</MKTypography>
                            <MKTypography fontSize={14}>{bookingsServices.formatDate(bookingData.check_out)}</MKTypography>
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
                          {bookingData?.finalSelectedRooms[0]?.amount &&
                            <MKTypography variant="h4" color="text">₹{bookingData?.finalSelectedRooms[0]?.amount.toFixed(2)}</MKTypography>
                          }
                        </MKBox>
                        <MKBox className="hotel-detail-row flex-item price" px={3}>
                          <MKTypography variant="h4" color="text">Discount</MKTypography>
                          {bookingData?.finalSelectedRooms[0]?.amount &&
                            <MKTypography variant="h4" color="text">₹{(parseFloat(bookingData?.finalSelectedRooms[0]?.amount * 20 /*offer_amount*/) / 100).toFixed(2)}</MKTypography>
                          }
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
