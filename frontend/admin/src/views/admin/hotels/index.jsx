import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { hotelsServices } from "services/hotels";
import { roomsServices } from "services/rooms";
import { Link } from "react-router-dom";
import AddHotel from "./add";
import Swal from "sweetalert2";
import Loader from "../loader";

const Hotels = () => {
  const [hotelsData, setHotelsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex = [
    {
      Header: "Image",
      accessor: "hotel_image",
    },
    {
      Header: "Code",
      accessor: "hotel_code",
    },
    {
      Header: "Name",
      accessor: "hotel_name",
    },
    {
      Header: "Country Code",
      accessor: "country_details[0].country_code",
    },
    {
      Header: "Location Code",
      accessor: "location_details[0].location_code",
    },
    {
      Header: "Total Rooms",
      accessor: "total_rooms",
    },
    {
      Header: "Status",
      accessor: "isActive",
    },
    {
      Header: "Actions",
      accessor: d => `${d._id}_${d.isActive}`,
    },
  ];

  useEffect(() => {
    getHotels();
  }, []);

  const getHotels = async () => {
    let response = await hotelsServices.getAllHotel();
    setHotelsData(response.data);
    setLoading(false);
  };

  const updateStatus = (hotelId, status) => {
    Swal.fire({
      icon: "warning",
      title: "Update Status ",
      text: "Are you sure you want to update status?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        hotelsServices
          .updateStatus(hotelId, status)
          .then((result) => {
            if (result.isSuccessful) {
              Swal.fire({
                title: "Updated",
                text: "Update Status successfully.",
                icon: "success",
                allowOutsideClick: false
              });
              getHotels();
            } else {
              Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
                allowOutsideClick: false
              });
            }
          })
          .catch((errMsg) => {
            console.error(errMsg);
          });
      }
    });
  };

  const softDeleteHotel = (hotelId) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Hotel",
      text: "Are you sure you want to delete hotel?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(hotelId);
        hotelsServices
          .softDeleteHotel(hotelId)
          .then((result) => {
            if (result.isSuccessful) {
              Swal.fire({
                title: "Deleted",
                text: "Hotel has been deleted successfully.",
                icon: "success",
                allowOutsideClick: false
              });
              getHotels();
            } else {
              Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
                allowOutsideClick: false
              });
            }
          })
          .catch((errMsg) => {
            console.error(errMsg);
          });
      }
    });
  };
  return (
    <>
      {loading ? <Loader /> : (
        <div className="list-table countries">
          <div className="add-row text-align-right mb-5 px-6">
            <Link to="add" className="btn btn-primary">
              Add Hotel
            </Link>
          </div>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={hotelsData}
            element="hotels"
            deleteElement={softDeleteHotel}
            updateElement={updateStatus}
          />
          <Routes>
            <Route path="/add" element={<AddHotel />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default Hotels;
