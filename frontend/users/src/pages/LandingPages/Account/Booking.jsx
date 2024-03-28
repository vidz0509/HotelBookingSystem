import React, { useState, useEffect } from "react";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { Grid, Card, CardMedia, CardContent } from "@mui/material";
import { authServices } from "services/auth";


export default function Booking() {
  const [bookings, setBookings] = useState([]);

  const getBookingByUserId = async () => {
    try {
      const response = await fetch("getbookingbyuser");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    getBookingByUserId();
  }, []);
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
                        image={booking.hotelImage} 
                        alt={booking.hotelName}
                      />
                      <CardContent>
                        <p>{booking.hotelName}</p>
                        <p>{booking.checkInDate}</p>
                        <p>{booking.checkOutDate}</p>
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
