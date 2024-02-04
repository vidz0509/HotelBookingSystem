import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { locationsServices } from "services/locations";
import { Link } from "react-router-dom";
import AddLocation from './add';
import Swal from 'sweetalert2';

const Locations = () => {

  const [locationsData, setLocationsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const initialState = {
    pageSize: 20,
    pageIndex: 0
  };

  const columnsDataComplex = [
    {
      Header: " Images",
      accessor: "location_image",
    },
    {
      Header: " Code",
      accessor: "location_code",
    },
    {
      Header: " Name",
      accessor: "location_name",
    },
    {
      Header: "Country Code",
      accessor: "country_details[0].country_code",
    },
    // {
    //   Header: "Register On",
    //   accessor: "createdAt",
    // },
    // {
    //   Header: "Modify On",
    //   accessor: "updatedAt",
    // },
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
    // debugger;
    getLocations();
  }, []);

  const getLocations = async () => {
    let response = await locationsServices.getAllLocations();
    setLocationsData(response.data);
    setLoading(false);
  }

  const softDeleteLocation = (locationId) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Location",
      text: "Are you sure you want to delete location?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(locationId);
        locationsServices.softDeleteLocation(locationId).then((result) => {
          if (result.isSuccessful) {
            Swal.fire({
              title: "Deleted",
              text: "Location has been deleted successfully.",
              icon: "success"
            });
            getLocations();
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
            <Link to="add" className="btn btn-primary">Add Location</Link>
          </div>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={locationsData}
            element='locations'
            deleteElement={softDeleteLocation}
            initialState={initialState}
          />
          <Routes>
            <Route path='/add' element={<AddLocation />} />
          </Routes>
        </div>
      }
    </>
  );
};

export default Locations;
