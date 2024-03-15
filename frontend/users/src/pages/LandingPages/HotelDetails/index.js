import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import { hotelsServices } from "services/hotels";
import SearchForm from "pages/Presentation/sections/SearchForm";
import { amenitiesServices } from "services/amenities";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import routes from "routes";
import footerRoutes from "footer.routes";
import Select from "assets/theme/components/form/select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import MKButton from "components/MKButton";

function HotelDetail() {
  const params = useParams();
  const hotelId = params.id;

  const [hotelName, setHotelName] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [hotelData, setHotelData] = useState(null);
  const [roomsData, setRoomsData] = useState(null);
  const [amenitiesData, setAmenitiesData] = useState(null);
  const [searchBody, setSearchBody] = useState(null);
  const [accordionIndex, setAccordionIndex] = useState(0);
 
  const renderData = amenitiesData && amenitiesData?.map((amenities) => (
    <Grid item xs={12} md={2} key={amenities._id}>
      <DefaultInfoCard title={amenities.amenities_name} icon={amenities.amenities_icon ? amenities.amenities_icon : "sports_gymnastics"} />
    </Grid>
  ));

  useEffect(() => {
    getHotelById(hotelId);
    getRoomsByHotelId(hotelId);
  }, [hotelId]);

  const getHotelById = async (hotelId) => {
    const result = await hotelsServices.getHotelById(hotelId);
    if (result.isSuccessful) {
      setLoading(false);
      setHotelData(result.data);
      setHotelName(result.data?.hotel_name);
      setHotelAddress(result.data?.hotel_address);
      setAmenitiesData(result.data?.amenities);
    }
  };

  const getRoomsByHotelId = async (hotelId) => {
    const result = await hotelsServices.getRoomsByHotelId(hotelId);
    if (result.isSuccessful) {
      setRoomsData(result.data);
    }
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <MKBox width="100%">
        <DefaultNavbar
          routes={routes}
        />
      </MKBox>
      <MKBox component="section">
        <Container sx={{ mt: 2 }} className='main-container account-container hotel-main-container'>
          <Grid className="searchform"><SearchForm hideHotelDetail={true} searchBody={searchBody} hotelId={hotelId} /></Grid>
          <Grid container spacing={2} alignItems="flex-start" sx={{ mt: 6, mb: 6 }} justifyContent="left" px={3}>
            <MKBox className='hotel-detaclick'>
              <MKBox className='hotel-head'>
                {!isLoading &&
                  <MKButton
                    component="a"
                    href={`/hotels?country_id=${hotelData.country_id}&location_id=${hotelData.location_id}`}
                    rel="noreferrer"
                    variant="contained"
                    color=""
                    size="big"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </MKButton>
                }
                <MKBox>
                  <MKTypography variant="h4" color="text">
                    {hotelName}
                  </MKTypography>
                  <MKTypography variant="p" color="text" mb={2} >
                    {hotelAddress}
                  </MKTypography>
                </MKBox>
              </MKBox>
            </MKBox>
          </Grid>

          <Grid container spacing={2} className="hotel-imgs" sx={{ display: 'block' }} px={3}>
            {!isLoading && hotelData?.hotel_image && (
              <Slider {...settings}>
                {
                  hotelData?.hotel_image.map((img, index) => (
                    <Grid item md={4} sx={{ mb: 2 }} key={`img_${index}`} className="hotel-img">
                      <img
                        src={img}
                        alt={hotelName}
                      />
                    </Grid>
                  ))
                }
              </Slider>
            )}
          </Grid>


          {roomsData && roomsData.length > 0 &&
            <MKBox className='room-details' sx={{ mt: 9, mb: 9 }}>

              {
                roomsData.map((room, index) => (
                  <>
                    <div className="room-item-wrap" onClick={(e) => {
                      setAccordionIndex(index)
                    }} key={`room-${index}`}>
                      <div className="room-head">

                        <MKTypography variant="h4" color="white" fontSize={18}>
                          {room.roomTypes_details[0].roomtype_name}
                        </MKTypography>
                      </div>
                      {accordionIndex === index && <>
                        <div className="item-content">
                          <Grid container spacing={2} className="room-result">
                            <Grid item md={3} className="room-left" mt={2}>
                              <div className="room-image">
                                <img src={room.room_image} />
                              </div>
                            </Grid>
                            <Grid item md={8} className="room-right" mt={3} ml={2}>
                              <Grid container spacing={2}>
                                <Grid item md={4}>
                                  <MKTypography variant="h6" color="text" mb={1}>Guests/Rooms</MKTypography>
                                  <MKTypography component="p" variant="p" color="text" fontSize={14}>{`Adults : ${room.roomTypes_details[0].max_adults}`}</MKTypography>
                                  <MKTypography variant="p" component="p" color="text" fontSize={14}>{`Children : ${room.roomTypes_details[0].max_children}`}</MKTypography>
                                  <MKTypography variant="p" component="p" color="text" fontSize={14}>{`Total Rooms : ${room.total_rooms}`}</MKTypography>
                                </Grid>
                                <Grid item md={4}>
                                  <MKTypography variant="h6" color="text">Price</MKTypography>
                                  <MKTypography variant="p" component="p" color="text" fontSize={14}>{`₹${room.price} per adult`}</MKTypography>
                                </Grid>
                                <Grid item md={4}>
                                  <MKTypography variant="h6" color="text">Select Rooms</MKTypography>
                                  <select name="Rooms" id="Rooms">
                                    <option value={0}>-- Select Rooms --</option>
                                    <option value={room.price * 1} selected>1 (₹{room.price * 1})</option>
                                    <option value={room.price * 2}>2 (₹{room.price * 2})</option>
                                    <option value={room.price * 3}>3 (₹{room.price * 3})</option>
                                  </select>
                                </Grid>

                              </Grid>
                            </Grid>
                          </Grid>
                        </div>
                      </>}

                    </div>
                  </>
                ))
              }
            </MKBox>
          }

          <Grid container spacing={1} sx={{ mt: 9, mb: 4 }} px={3} justifyContent={"center"}>
            <MKBox>
              <MKTypography variant="h3" fontWeight="bold" >
                What is this place offers
              </MKTypography>
            </MKBox>
          </Grid>

          <Grid container spacing={1} sx={{ mt: 1, mb: 9 }} px={3} justifyContent={"center"}>
            {renderData}
          </Grid>



        </Container>
      </MKBox>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default HotelDetail;

