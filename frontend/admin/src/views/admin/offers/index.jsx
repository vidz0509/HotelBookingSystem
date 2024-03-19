import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { offersServices } from "services/offers";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../loader";
import AddOffer from "./add";

const Offers = () => {
  const [offersData, setOffersData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex = [
    {
      Header: "Code",
      accessor: "offer_code",
    },
    {
      Header: "Offer Type",
      accessor: "offer_type",
    },
    {
      Header: "Offer Amount",
      accessor: "offer_amount",
    },
    {
      Header: "isOneTime",
      accessor: "isOneTime",
    },
    {
      Header: "Expired On",
      accessor: "expired_on",
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
    getOffers();
  }, []);

  const getOffers = async () => {
    let response = await offersServices.getAllOffers();
    setOffersData(response.data);
    setLoading(false);
  };

  const updateStatus = (offerId, status) => {
    Swal.fire({
      icon: "warning",
      title: "Update Status ",
      text: "Are you sure you want to update status?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        offersServices
          .updateStatus(offerId, status)
          .then((result) => {
            if (result.isSuccessful) {
              Swal.fire({
                title: "Updated",
                text: "Update Status successfully.",
                icon: "success",
                allowOutsideClick: false
              });
              getOffers();
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

  const softDeleteOffers = (offerId) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Offers",
      text: "Are you sure you want to delete offer?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(offerId);
        offersServices
          .softDeleteOffers(offerId)
          .then((result) => {
            if (result.isSuccessful) {
              Swal.fire({
                title: "Deleted",
                text: "Offer has been deleted successfully.",
                icon: "success",
                allowOutsideClick: false
              });
              getOffers();
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
        <div className="list-table offers">
          <div className="add-row text-align-right mb-5 px-6">
            <Link to="add" className="btn btn-primary">
              Add Offers
            </Link>
          </div>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={offersData}
            element="offers"
            deleteElement={softDeleteOffers}
            updateElement={updateStatus}
          />
          <Routes>
            <Route path="/add" element={<AddOffer />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default Offers;
