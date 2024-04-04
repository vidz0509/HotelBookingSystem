import ComplexTable from "views/admin/dashboard/components/ComplexTable";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { bookingsServices } from "services/bookings";
import Loader from "views/admin/loader";

const Bookings = () => {
  const [bookingsdata, setBookingsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex = [
    {
      Header: "Image",
      accessor: "hotel_details[0].hotel_image[0]",
    },
    {
      Header: "Hotel Name",
      accessor: "hotel_details[0].hotel_name",
    },
    {
      Header: "Country Name",
      accessor: "country_details[0].country_name",
    },
    {
      Header: "Location Name",
      accessor: "location_details[0].location_name",
    },
    {
      Header: "User Name",
      accessor: "users_details[0].fullname",
    },
    {
      Header: "Price",
      accessor: "total_amount",
    },
    {
      Header: "Check In",
      accessor: "check_in",
    },
    {
      Header: "Check Out",
      accessor: "check_out",
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    let response = await bookingsServices.getAllBookings();
    setBookingsData(response.data);
    setLoading(false);
  };


  return (
    <>
      {loading ? <Loader /> : (
        <div className="list-table bookings">
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={bookingsdata}
            element="bookings"
          />
        </div>
      )}
    </>
  );
};

export default Bookings;
