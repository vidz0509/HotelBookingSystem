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
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={booking.hotel_details[0].hotel_image[0]}/*hotelimage*/
                      alt={booking.hotel_details[0].hotel_name}/*hotelName*/
                    />
                    <CardContent>
                      <p>{booking.country_details[0].country_name}</p>{/*coutryName*/}
                      <p>{booking.location_details[0].location_name}</p>{/*locationName*/}
                      <p>{booking.total_rooms}</p>{/*Rooms*/}
                      <p>{booking.room_details}</p>{/*Roomtype*/}
                      <p>{booking.total_amount}</p>{/*price*/}
                      <p>{booking.check_in}</p>
                      <p>{booking.check_out}</p>
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
