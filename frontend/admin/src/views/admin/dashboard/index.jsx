import React from "react";
import { useState, useEffect } from "react";
import { customerServices } from "services/customer";
import { countriesServices } from "services/countries"
import { locationsServices } from "services/locations"
import { roomtypeServices } from "services/roomtype";
import { hotelsServices } from "services/hotels";
import { amenitiesServices } from "services/amenities";

// import { columnsDataComplex } from "./variables/columnsData";
// columnsDataCheck,
import Widget from "components/widget/Widget";
// import CheckTable from "views/admin/dashboard/components/CheckTable";
// import ComplexTable from "views/admin/dashboard/components/ComplexTable";
// import DailyTraffic from "views/admin/dashboard/components/DailyTraffic";
// import TaskCard from "views/admin/dashboard/components/TaskCard";
// import tableDataCheck from "./variables/tableDataCheck.json";
// import tableDataComplex from "./variables/tableDataComplex.json";

import {
  MdSupervisedUserCircle,
  MdMenuBook,
  MdPublic,
  MdHotelClass,
  MdRoom,
  // MdPayments,
  MdWifi,
  MdHotel,
  // MdReport,
  // MdRateReview,
} from "react-icons/md";

const Dashboard = () => {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCountries, setTotalCountries] = useState(0);
  const [totalLocations, setTotalLocations] = useState(0);
  const [totalRoomType, setTotalRoomType] = useState(0);
  const [totalHotels, setTotalHotels] = useState(0);
  const [totalAmenities, setTotalAmenities] = useState(0);

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

  return (
    <div>
      {/* Card widget */}


      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4">
        <Widget
          icon={<MdSupervisedUserCircle className="h-7 w-7" />}
          title={"Customers"}
          subtitle={totalUsers}
        />
        <Widget
          icon={<MdPublic className="h-6 w-6" />}
          title={"Countries"}
          subtitle={totalCountries}
        />
        <Widget
          icon={<MdRoom className="h-7 w-7" />}
          title={"Locations"}
          subtitle={totalLocations}
        />
        <Widget
          icon={<MdHotel className="h-6 w-6" />}
          title={"Room Types"}
          subtitle={totalRoomType}
        />
        <Widget
          icon={<MdHotelClass className="h-7 w-7" />}
          title={"Hotels"}
          subtitle={totalHotels}
        />
        <Widget
          icon={<MdWifi className="h-6 w-6" />}
          title={"Amenities"}
          subtitle={totalAmenities}
        />
        <Widget
          icon={<MdMenuBook className="h-7 w-7" />}
          title={"Bookings"}
          subtitle={""}
        />
        {/* <Widget
          icon={<MdPayments className="h-6 w-6" />}
          title={"Payment Status"}
          subtitle={""}
        />
        <Widget
          icon={<MdReport className="h-7 w-7" />}
          title={"Reports"}
          subtitle={""}
        />
        <Widget
          icon={<MdRateReview className="h-6 w-6" />}
          title={"Reviews"}
          subtitle={""}
        /> */}
      </div>
    </div>
  );
};

export default Dashboard;
