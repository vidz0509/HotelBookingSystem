import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import DefaultReviewCard from "examples/Cards/ReviewCards/DefaultReviewCard";

function Information() {
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
          <MKTypography variant="h2"mb={3}>Customers Reviews</MKTypography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              name="Nick Willever"
              date="1 day ago"
              review="Looks exactly what is posted here. Great service and awesome stay!"
              rating={3}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              color="info"
              name="Shailesh Kushwaha"
              date="1 week ago"
              review="Brilliant hotel staff where excellent and very professionals"
              rating={5}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              name="Samuel Kamuli"
              date="3 weeks ago"
              review="If you want to stay for a night and have a good privacy, book right now."
              rating={4}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
