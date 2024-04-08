import React, { useState, useEffect } from "react";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { Grid, Card, CardMedia, CardContent } from "@mui/material";
import { offersServices } from "services/offers";

export default function Offer() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getOffers();
  }, []);

  const getOffers = async () => {
    const result = await offersServices.getAllOffers();
    if (result.isSuccessful) {
      // setOffers(result.data);
      const activeData = result.data.filter(item => item.isActive);
      setOffers(activeData);
    }
  };
  return (
    <>
      <MKBox display="flex" flexDirection="column" justifyContent="center">
        <MKBox>
          <MKBox width="100%" component="form" method="post" autoComplete="off">
            <MKTypography variant="h4" color="text" mb={4}>
              My Offers
            </MKTypography>

            <Grid
              container
              item
              xs={12}
              lg={10}
              justifyContent="center"
              mx="auto"
              className="form-wrap"
            >
              <Grid container spacing={3}>
                {offers.map((offers, index) => (
                  <Grid item xs={4} key={index}>
                    <Card>
                      <CardContent className="offer-card">
                        <img src="/offers.png" className="customImage" width="100" height="100" />
                        <h5>{offers.offer_type}</h5>
                        <h4>{offers.offer_code}</h4>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </MKBox>
        </MKBox>
      </MKBox>
    </>
  );
}
