import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { locationsServices } from "services/locations";
import { Link } from "react-router-dom";
import AddLocation from "./add";
import Swal from "sweetalert2";
import Loader from "../loader";

const Locations = () => {
  const [locationsData, setLocationsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const initialState = {
    pageSize: 20,
    pageIndex: 0,
  };

  const columnsDataComplex = [
    {
      Header: "Image",
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
    getLocations();
  }, []);

  const getLocations = async () => {
    let response = await locationsServices.getAllLocations();
    setLocationsData(response.data);
    setLoading(false);
  };

  const updateStatus = (locaionId, status) => {
    Swal.fire({
      icon: "warning",
      title: "Update Status ",
      text: "Are you sure you want to update status?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        locationsServices
          .updateStatus(locaionId, status)
          .then((result) => {
            if (result.isSuccessful) {
              Swal.fire({
                title: "Updated",
                text: "Update Status successfully.",
                icon: "success",
                allowOutsideClick: false
              });
              getLocations();
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

  const softDeleteLocation = (locationId) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Location",
      text: "Are you sure you want to delete location?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(locationId);
        locationsServices
          .softDeleteLocation(locationId)
          .then((result) => {
            if (result.isSuccessful) {
              Swal.fire({
                title: "Deleted",
                text: "Location has been deleted successfully.",
                icon: "success",
                allowOutsideClick: false
              });
              getLocations();
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
              Add Location
            </Link>
          </div>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={locationsData}
            element="locations"
            deleteElement={softDeleteLocation}
            initialState={initialState}
            updateElement={updateStatus}
          />
          <Routes>
            <Route path="/add" element={<AddLocation />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default Locations;
