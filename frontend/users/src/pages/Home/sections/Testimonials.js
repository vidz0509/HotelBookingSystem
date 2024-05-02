import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import DefaultReviewCard from "examples/Cards/ReviewCards/DefaultReviewCard";
import { reviewsServices } from "services/reviews";


function Information() {
  const [reviewsData, setReviewsData] = useState(null);
  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    let response = await reviewsServices.getAllReviews();
    setReviewsData(response.data);
  }
  return (
    <MKBox component="section" my={0} >
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          justifyContent="center"
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <MKTypography variant="h2" mb={3}>Customers Reviews</MKTypography>
        </Grid>
        <Grid container spacing={2}>
          {/* {reviewsData?.map((review) => (
            <Grid key={review.user_id} item xs={12} md={6} lg={4}>
              <DefaultReviewCard
                name={review.users_details[0].fullname}
                review={review.review_text}
                rating={review.rating}
              />
            </Grid>
          ))} */}
          {reviewsData?.map((review) => (
            <Grid key={review.user_id} item xs={12} md={6} lg={4}>
              <DefaultReviewCard
                color="info"
                name={review.users_details[0].fullname}
                review={review.review_text}
                rating={review.rating}
              />
            </Grid>
          ))}
          {/* <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              name="Samuel Kamuli"
              date="3 weeks ago"
              review="If you want to stay for a night and have a good privacy, book right now."
              rating={4}
            />
          </Grid> */}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
