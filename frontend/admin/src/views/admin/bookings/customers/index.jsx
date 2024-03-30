import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { bookingsServices } from "services/bookings";
import { Link } from "react-router-dom";
import AddCountry from "./add";
import Swal from "sweetalert2";
import Loader from "../loader";

const Bookings = () => {
  const [bookingsdata, setBookingsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex = [
    {
      Header: "Image",
      accessor: "country_image",
    },
    {
      Header: " Code",
      accessor: "country_code",
    },
    {
      Header: " Name",
      accessor: "country_name",
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
      accessor: d => `${d._id}_${d.isActive}`,
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

  const updateStatus = (countryId, status) => {
    Swal.fire({
      icon: "warning",
      title: "Update Status ",
      text: "Are you sure you want to update status?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        bookingsServices
          .updateStatus(countryId, status)
          .then((result) => {
            if (result.isSuccessful) {
              Swal.fire({
                title: "Updated",
                text: "Update Status successfully.",
                icon: "success",
                allowOutsideClick: false
              });
              getBookings();
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
      } else {
        window.location.reload();
      }
    });
  };

  const softDeleteCountry = (countryId) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Country",
      text: "Are you sure you want to delete country?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(countryId);
        bookingsServices
          .softDeleteCountry(countryId)
          .then((result) => {
            if (result.isSuccessful) {
              Swal.fire({
                title: "Deleted",
                text: "Country has been deleted successfully.",
                icon: "success",
                allowOutsideClick: false
              });
              getBookings();
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
        <div className="list-table bookings">
          <div className="add-row text-align-right mb-5 px-6">
            <Link to="add" className="btn btn-primary">
              Add Country
            </Link>
          </div>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={bookingsData}
            element="bookings"
            deleteElement={softDeleteCountry}
            updateElement={updateStatus}
          />
          <Routes>
            <Route path="/add" element={<AddCountry />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default Bookings;
