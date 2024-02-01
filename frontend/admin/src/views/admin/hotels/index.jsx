import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { hotelsServices } from "services/hotels";
import { Link } from "react-router-dom";
import AddHotel from "./add";
import Swal from "sweetalert2";

const Hotels = () => {

  const [hotelsData, setHotelsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex =  [
    {
      Header: " Image",
      accessor: "hotel_image",
    },
    {
      Header: " Code",
      accessor: "hotel_code",
    },
    {
      Header: " Name",
      accessor: "hotel_name",
    },
    {
      Header: "Country Code",
      accessor: "country_code",
    },
    {
      Header: "Location Code",
      accessor: "location_code",
    },
    {
      Header: "Status",
      accessor: "isActive",
    },
    {
      Header: "Actions",
      accessor: "_id",
    },
  ];

  useEffect(() => {
    getHotels();
  }, []);

  const getHotels = async () => {
    let response = await hotelsServices.getAllHotel();
    setHotelsData(response.data);
    setLoading(false);
  }

  const softDeleteHotel = (hotelId) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Hotel",
      text: "Are you sure you want to delete hotel?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(hotelId);
        hotelsServices.softDeleteHotel(hotelId).then((result) => {
          if (result.isSuccessful) {
            Swal.fire({
              title: "Deleted",
              text: "Hotel has been deleted successfully.",
              icon: "success"
            });
            getHotels();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error"
            });
          }
        }).catch((errMsg) => {
          console.error(errMsg);
        })
      }
    });
  }
  return (
    <>
      {!loading &&
        <div className="list-table countries">
          <div className="add-row px-6 mb-5 text-align-right">
            <Link to="add" className="btn btn-primary">Add Hotel</Link>
          </div>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={hotelsData}
            element='hotels'
            deleteElement={softDeleteHotel}
          />
          <Routes>
            <Route path='/add' element={<AddHotel />} />
          </Routes>
        </div>
      }
    </>
  );
};

export default Hotels;
