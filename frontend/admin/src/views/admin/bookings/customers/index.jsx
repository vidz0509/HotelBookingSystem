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
      Header: " Name",
      accessor: "booking_name",
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
