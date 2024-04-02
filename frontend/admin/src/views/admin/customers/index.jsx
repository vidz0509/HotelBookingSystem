

import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from 'react';
import { customerServices } from "services/customer";
import Swal from "sweetalert2";
import Loader from "../loader";


const Customers = () => {
  const [customersData, setCustomersData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex = [
    {
      Header: "Full Name",
      accessor: "fullname",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Contact No.",
      accessor: "phone",
    },
    {
      Header: "Register On",
      accessor: "createdAt",
    },
    {
      Header: "Status",
      accessor: "isActive",
    },
    {
      Header: "Actions",
      accessor: d => `${d._id}_${d.isActive}`
    },
  ];


  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    let response = await customerServices.getAllCustomers();
    setCustomersData(response.data);
    setLoading(false);
  }

  const updateStatus = (userId, status) => {
    Swal.fire({
      icon: "warning",
      title: "Update Status ",
      text: "Are you sure you want to update status?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        customerServices.updateStatus(userId, status).then((result) => {
          if (result.isSuccessful) {
            Swal.fire({
              title: "Updated",
              text: "Update Status successfully.",
              icon: "success",
              allowOutsideClick: false
            });
            getCustomers();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
              allowOutsideClick: false
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
      {loading ? <Loader /> : (
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={customersData}
          isCustomerTable={true}
          updateElement={updateStatus}
        />
      )
      }
    </>
  );
};


export default Customers;
