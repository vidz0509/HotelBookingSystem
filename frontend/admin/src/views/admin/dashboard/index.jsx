import React from "react";
import { useState, useEffect } from "react";
import { customerServices } from "services/customer";
import { countriesServices } from "services/countries"
import { locationsServices } from "services/locations"
import { roomsServices } from "services/rooms";
import { roomtypeServices } from "services/roomtype";
import { hotelsServices } from "services/hotels";
import { amenitiesServices } from "services/amenities";
import { offersServices } from "services/offers";
import { reviewsServices } from "services/reviews";

import Widget from "components/widget/Widget";

import {
  MdSupervisedUserCircle,
  MdMenuBook,
  MdPublic,
  MdHotelClass,
  MdRoom,
  MdBedroomParent,
  MdWifi,
  MdHotel,
  MdLocalOffer,
  MdRateReview,
} from "react-icons/md";
import { bookingsServices } from "services/bookings";

const Dashboard = () => {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCountries, setTotalCountries] = useState(0);
  const [totalLocations, setTotalLocations] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalRoomType, setTotalRoomType] = useState(0);
  const [totalHotels, setTotalHotels] = useState(0);
  const [totalAmenities, setTotalAmenities] = useState(0);
  const [totalOffers, setTotalOffers] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);


  useEffect(() => {
    userCount();
  }, []);

  const userCount = async () => {
    const result = await customerServices.userCount();
    if (result.isSuccessful) {
      setTotalUsers(result.count);
    }
  }

  useEffect(() => {
    countryCount();
  }, []);

  const countryCount = async () => {
    const result = await countriesServices.countryCount();
    if (result.isSuccessful) {
      setTotalCountries(result.count);
    }
  }

  useEffect(() => {
    locationCount();
  }, []);

  const locationCount = async () => {
    const result = await locationsServices.locationCount();
    if (result.isSuccessful) {
      setTotalLocations(result.count);
    }
  }

  useEffect(() => {
    roomCount();
  }, []);

  const roomCount = async () => {
    const result = await roomsServices.roomCount();
    if (result.isSuccessful) {
      setTotalRooms(result.count);
    }
  }


  useEffect(() => {
    RoomTypeCount();
  }, []);

  const RoomTypeCount = async () => {
    const result = await roomtypeServices.RoomTypeCount();
    if (result.isSuccessful) {
      setTotalRoomType(result.count);
    }
  }

  useEffect(() => {
    HotelsCount();
  }, []);

  const HotelsCount = async () => {
    const result = await hotelsServices.HotelsCount();
    if (result.isSuccessful) {
      setTotalHotels(result.count);
    }
  }

  useEffect(() => {
    AmenitiesCount();
  }, []);

  const AmenitiesCount = async () => {
    const result = await amenitiesServices.AmenitiesCount();
    if (result.isSuccessful) {
      setTotalAmenities(result.count);
    }
  }

  useEffect(() => {
    OffersCount();
  }, []);

  const OffersCount = async () => {
    const result = await offersServices.OffersCount();
    if (result.isSuccessful) {
      setTotalOffers(result.count);
    }
  }

  useEffect(() => {
    BookingsCount();
  }, []);

  const BookingsCount = async () => {
    const result = await bookingsServices.BookingsCount();
    if (result.isSuccessful) {
      setTotalBookings(result.count);
    }
  }

  useEffect(() => {
    ReviewsCount();
  }, []);

  const ReviewsCount = async () => {
    const result = await reviewsServices.ReviewsCount();
    if (result.isSuccessful) {
      setTotalReviews(result.count);
    }
  }

  return (
    <div>


      <div className="mt-4 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 ">
        <Widget
          icon={<MdSupervisedUserCircle className="h-7 w-7 " />}
          title={"Customers"}
          link={"/admin/customers"}
          subtitle={totalUsers}
        />
        <Widget
          icon={<MdPublic className="h-6 w-6" />}
          title={"Countries"}
          link={"/admin/countries"}
          subtitle={totalCountries}
        />
        <Widget
          icon={<MdRoom className="h-7 w-7" />}
          title={"Locations"}
          link={"/admin/locations"}
          subtitle={totalLocations}
        />
        <Widget
          icon={<MdBedroomParent className="h-6 w-6" />}
          title={"Rooms"}
          link={"/admin/rooms"}
          subtitle={totalRooms}
        />
        <Widget
          icon={<MdHotel className="h-6 w-6" />}
          title={"Room types"}
          link={"/admin/roomtypes"}
          subtitle={totalRoomType}
        />
        <Widget
          icon={<MdHotelClass className="h-7 w-7" />}
          title={"Hotels"}
          link={"/admin/hotels"}
          subtitle={totalHotels}
        />
        <Widget
          icon={<MdWifi className="h-6 w-6" />}
          title={"Amenities"}
          link={"/admin/amenities"}
          subtitle={totalAmenities}
        />
        <Widget
          icon={<MdLocalOffer className="h-6 w-6" />}
          title={"Offers"}
          link={"/admin/offers"}
          subtitle={totalOffers}
        />
        <Widget
          icon={<MdRateReview className="h-6 w-6" />}
          title={"Reviews"}
          link={"/admin/reviews/customers"}
          subtitle={totalReviews}
        />
        <Widget
          icon={<MdMenuBook className="h-7 w-7" />}
          title={"Bookings"}
          link={"/admin/bookings"}
          subtitle={totalBookings}
        />
      </div>
    </div>
  );
};

export default Dashboard;
