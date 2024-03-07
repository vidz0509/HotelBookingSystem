import React, { useState, useEffect } from "react";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
// import MKButton from "components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
// import Hotels from "../Hotels";
import { hotelsServices } from "services/hotels";
import { amenitiesServices } from "services/amenities";
import { useParams } from "react-router-dom";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

function HotelDetail() {
  const params = useParams();
  const hotelId = params.id;

  const [hotelName, setHotelName] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [hotelData, setHotelData] = useState(null);
  const [totalrooms, setTotalRooms] = useState(0);
  const [amenitiesData, setAmenitiesData] = useState(null);
  useEffect(() => {
    getAmenities();
  }, []);

  const getAmenities = async () => {
    let response = await amenitiesServices.getAllAmenities();
    setAmenitiesData(response.data);
  }

  const renderData = amenitiesData && amenitiesData?.map((amenities) => (
    <Grid item xs={12} md={2} key={amenities._id}>
      <DefaultInfoCard title={amenities.amenities_name} icon={amenities.amenities_icon ? amenities.amenities_icon : "sports_gymnastics"} />
    </Grid>
  ));

  useEffect(() => {
    getHotelById(hotelId);
    // const result = await hotelsServices.getHotelById(hotelId);
  }, [hotelId]);

  const getHotelById = async (hotelId) => {
    const result = await hotelsServices.getHotelById(hotelId);
    if (result.isSuccessful) {
      setHotelData(result.data);
      setHotelName(result.data?.hotel_name);
      setHotelAddress(result.data?.hotel_address);
      setTotalRooms(result.data?.total_rooms);
    }
  };

  // setBtnDisabled(true);
  // const requestBody = {
  //   hotel_name: hotelName,
  //   hotel_address: hotelAddress,
  //   total_rooms: totalrooms
  // };

  return (
    <>
      <MKBox width="100%">
        <DefaultNavbar
          routes={routes}
        />
      </MKBox>

      <Container sx={{ mt: 2 }} className='main-container account-container'>
        <Grid container spacing={2} alignItems="flex-start" sx={{ mt: 6 }} className="account-content" justifyContent="left">
          <MKBox display="flex" flexDirection="column" justifyContent="center">
            <MKTypography variant="button h5" color="text" mb={2} >
              Hotel Image
            </MKTypography>
            <Grid>
              {hotelData?.hotel_image && (
                <div className="hotel-imgs mb-3 flex">
                  {Array.isArray(hotelData?.hotel_image) ? (
                    hotelData?.hotel_image.map((img, index) => (
                      <img
                        src={img}
                        alt={hotelName}
                        key={`img_${index}`}
                        className="hotelImg mx-2 my-2"
                      />
                    ))
                  ) : (
                    <>
                      <img src={hotelData?.hotel_image} alt={hotelName} />
                    </>
                  )}
                </div>
              )}
            </Grid>
            <MKTypography variant="button h5" color="text" mb={2} >
              Hotel Name
            </MKTypography>
            {hotelName}
            <MKTypography variant="button h5" color="text" mb={2} >
              Room Types
            </MKTypography>
            <MKTypography variant="button h5" color="text" mb={2} >
              Hotel Address
            </MKTypography>
            {hotelAddress}
            <MKTypography variant="button h5" color="text" mb={2} >
              Total Rooms
            </MKTypography>
            {totalrooms}
          </MKBox>


          <Grid container spacing={2} alignItems="flex-start" sx={{ mt: 6 }} justifyContent="left">
            <MKTypography variant="h3" fontWeight="bold">
              What is this place offers
            </MKTypography>
          </Grid>

          <Grid container spacing={1}>
            {renderData}
          </Grid>
        </Grid>
      </Container >

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default HotelDetail;

