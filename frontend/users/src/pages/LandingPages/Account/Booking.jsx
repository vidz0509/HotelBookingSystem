import React, { useState, useEffect } from "react";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { Grid, Card, CardMedia, CardContent } from "@mui/material";
import { authServices } from "services/auth";
import { bookingsServices } from "services/bookings";

export default function Booking() {

  const userData = authServices.getCurrentUser();
  const [user_id, setUserId] = useState(userData._id);
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    const currentUser = authServices.getCurrentUser();
    if (currentUser && currentUser.user_id) {
      setUserId(currentUser.user_id);
      getBookingByUserId(currentUser.user_id);
    }
  }, []);
  
  useEffect(() => {
    getBookingByUserId(user_id);
  }, [user_id]);
  
  const getBookingByUserId = async (user_id) => {
    const result = await bookingsServices.getBookingByUserId(user_id);
    if (result.isSuccessful) {
      setBookings(result.data);
    }
  };
  return (
    <>
      <MKBox display="flex" flexDirection="column" justifyContent="center">
        <MKBox>
          <MKBox width="100%" component="form" method="post" autoComplete="off">
            <MKTypography variant="h4" color="text" mb={4}>
              My Bookings
            </MKTypography>
            <Grid container spacing={3}>
              {bookings.map((booking, index) => (
                <Grid item xs={12} key={index}>
                  <Card className="booking-details">
                    <CardMedia
                      component="img"
                      height="190"
                      width={327}
                      image={booking.hotel_details[0].hotel_image[0]}
                      alt={booking.hotel_details[0].hotel_name}
                    />
                    <CardContent>
                      <p><b>Country Name : </b>{booking.country_details[0].country_name}</p>
                      <p><b>Location Name : </b>{booking.location_details[0].location_name}</p>
                      <p><b>Total Rooms : </b>{booking.total_rooms}</p>
                      {/* <p><b>Room Details : </b>{booking.room_details}</p> */}
                      <p><b>Total Amount : </b>{booking.total_amount}</p>
                      <p><b>Check IN  : </b>{booking.check_in}</p>
                      <p><b>Check Out : </b>{booking.check_out}</p>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </MKBox>
        </MKBox>
      </MKBox>
    </>
  );
}
