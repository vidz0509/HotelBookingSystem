
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { hotelsServices } from "services/hotels";

function HotelsList(props) {

  const [Roomtypedata, setRoomtypedata] = useState("");
  const [loading, setLoading] = useState(true);
  const [Amenities, setAmenities] = useState("");
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [hotelsData, setHotelsData] = useState(null);
  const [searchBody, setSearchBody] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setHotelsData(props.hotelData)
    let params = new URLSearchParams(window.location.search);
    let body = {
      country_id: params.get('country_id') ? params.get('country_id') : '',
      location_id: params.get('location_id') ? params.get('location_id') : '',
      check_in: params.get('check_in') ? params.get('check_in') : '',
      check_out: params.get('check_out') ? params.get('check_out') : '',
      roomTypes: [],
      amenities: [],
    }
    setSearchBody(body);
  }, []);

  useEffect(() => {
    searchHotels();
  }, [searchBody])

  const searchHotels = async () => {
    setLoading(true);
    if (searchBody) {
      let response = await hotelsServices.searchHotels(searchBody);
      if (response.isSuccessful) {
        setHotelsData(response.data);
        // const activeData = response.data.filter(item => item.isActive);
        // setHotelsData(activeData);
        setLoading(false);
      } else {
        setError(response.errorMessage);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    getRoomType();
    getAmenities();
  }, []);

  const getRoomType = async () => {
    let response = await hotelsServices.getAllRoomTypes();
    setRoomtypedata(response.data);
  };

  const getAmenities = async () => {
    let response = await hotelsServices.getAmenities();
    setAmenities(response.data);
  };

  const handleRoomTypeChange = (event) => {
    let roomTypeID = event.target.value;
    if (event.target.checked === true) {
      let roomTypeArr = selectedRoomTypes;
      roomTypeArr.push(roomTypeID);
      setSelectedRoomTypes((prevalue) => [...prevalue, roomTypeID]);
      setSearchBody({ ...searchBody, roomTypes: roomTypeArr, amenities: selectedAmenities });
    } else {
      const roomTypes = selectedRoomTypes.filter((type) => {
        return type !== roomTypeID;
      });
      setSelectedRoomTypes(roomTypes);
      setSearchBody({ ...searchBody, roomTypes: roomTypes, amenities: selectedAmenities });
    }
  }

  const handleAmenitiesChange = (event) => {
    let amenitieID = event.target.value;
    if (event.target.checked === true) {
      let amenitieArr = selectedAmenities;
      amenitieArr.push(amenitieID);
      setSelectedAmenities((prevalue) => [...prevalue, amenitieID]);
      setSearchBody({ ...searchBody, roomTypes: selectedRoomTypes, amenities: amenitieArr });
    } else {
      const amenities = selectedAmenities.filter((type) => {
        return type !== amenitieID;
      });
      console.log(amenities)
      setSelectedAmenities(amenities);
      setSearchBody({ ...searchBody, roomTypes: selectedRoomTypes, amenities: amenities });
    }
  }

  const clearAllFilters = () => {
    setSelectedRoomTypes([]); // Clear selected room types
    setSelectedAmenities([]); // Clear selected amenities
    setSearchBody({ ...searchBody, roomTypes: [], amenities: [] })
  }


  return (
    <MKBox component="section" my={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 1, mx: "auto", px: 0.75 }}
        >
          <MKBadge
            variant="contained"
            color="info"
            container
            sx={{ mb: 2 }}
          />
          <MKTypography variant="h2" fontWeight="bold">Huge collection of Hotels</MKTypography>
          <MKTypography variant="body1" color="text">Experience ultimate luxury at our five-star resort.</MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>
        <Grid container spacing={3} className="hotel-listing-main">
          <div className="filter-wrapper">
            <div className="filter-head">
              <h5 className="filter-title">Filters</h5>
              <h5 onClick={clearAllFilters} className="clear-filters">Clear All</h5>
            </div>
            <div className="filter-options">
              <div className="option-row">
                <div className="title">
                  <span className="icon" name="caret-right"></span>
                  <h5>Room Types</h5>
                </div>

                <div className="options default-opts">
                  {Roomtypedata &&
                    Roomtypedata.length > 0 &&
                    Roomtypedata.map((item) => (

                      <div className="opt" key={item._id}>
                        <label className="opt-label checkbox-label">
                          <input type="checkbox" value={item._id} name="Room_type[]" onChange={handleRoomTypeChange}
                            checked={selectedRoomTypes.includes(item._id)} />
                          <p className="opt-text">{item.roomtype_name}</p>
                        </label>
                      </div>
                    ))}

                </div>
              </div>
              <div className="option-row">
                <div className="title">
                  <span className="icon" name="caret-right"></span>
                  <h5>Amenities</h5>
                </div>
                <div className="options default-opts">
                  {Amenities &&
                    Amenities.length > 0 &&
                    Amenities.map((item) => (

                      <div className="opt" key={item._id}>
                        <label className="opt-label checkbox-label">
                          <input type="checkbox" value={item._id} name="Amenities_type[]" onChange={handleAmenitiesChange}
                            checked={selectedAmenities.includes(item._id)} />
                          <p className="opt-text">{item.amenities_name}</p>
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <Grid container spacing={2} lg={9} className="hotels-wrapper">
            {hotelsData && hotelsData.length > 0 ? (
              hotelsData && hotelsData?.map((hotel) => (
                <Grid item md={4} sx={{ mb: 2 }} key={hotel._id} className="hotel-item">
                  <MKBox position="relative">
                    <Link to={`/hotel-details/${hotel._id}?${window.location.search}`}>
                    <img
                      className="hotel-image"
                      src={hotel.hotel_image[0]}
                      alt={hotel.hotel_name}
                      width="100%"
                      opacity={1}
                    />
                      <MKBox mt={2} lineHeight={1}>
                        <MKTypography variant="h5" fontWeight="bold" className="hotel-title">
                          {hotel.hotel_name}
                        </MKTypography>
                        <MKTypography variant="p" className="hotel-location">
                          {hotel.location_details[0]?.location_name}
                        </MKTypography>
                      </MKBox>
                    </Link>
                  </MKBox>
                  <MKBox mt={2} lineHeight={1}>
                    <MKTypography variant="h5" fontWeight="bold" className="hotel-title">
                      ₹{hotel.room_price.toFixed(2)}
                    </MKTypography>
                  </MKBox>
                </Grid>
              ))) : (
              <Grid
                container
                item
                xs={12}
                lg={6}
                flexDirection="column"
                alignItems="center"
                sx={{ textAlign: "center", my: 1, mx: "auto", px: 0.75 }}
              >
                <MKBadge
                  variant="contained"
                  color="info"
                  container
                  sx={{ mb: 2 }}
                />
                <img src="/filter.png" className="customImage" width="100" height="100" />
                <MKTypography variant="h3" fontWeight="bold">All Properties Filtered Out!</MKTypography>
                <MKTypography variant="body2" color="text">We couldn`t find any properties matching the criteria. Please remove the filters applied and try again.</MKTypography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default HotelsList;
