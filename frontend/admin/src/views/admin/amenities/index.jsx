import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { amenitiesServices } from "services/amenities";
import { Link } from "react-router-dom";
import AddAmenities from "./add";
import Swal from "sweetalert2";

const Amenities = () => {

  const [amenitiesData, setAmenitiesData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex =  [
    {
      Header: " Name",
      accessor: "amenities_name",
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
    getAmenities();
  }, []);

  const getAmenities = async () => {
    let response = await amenitiesServices.getAllAmenities();
    setAmenitiesData(response.data);
    setLoading(false);
  }

  const softDeleteAmenities = (amenitiesId) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Amenities",
      text: "Are you sure you want to delete Amenities?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(amenitiesId);
        amenitiesServices.softDeleteAmenities(amenitiesId).then((result) => {
          if (result.isSuccessful) {
            Swal.fire({
              title: "Deleted",
              text: "Amenities has been deleted successfully.",
              icon: "success"
            });
            getAmenities();
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
            <Link to="add" className="btn btn-primary">Add Amenities</Link>
          </div>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={amenitiesData}
            element='amenities'
            deleteElement={softDeleteAmenities}
          />
          <Routes>
            <Route path='/add' element={<AddAmenities />} />
          </Routes>
        </div>
      }
    </>
  );
};

export default Amenities;
