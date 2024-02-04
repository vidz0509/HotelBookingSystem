

import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from 'react';
import { customerServices } from "services/customer";


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
      accessor: "_id",
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
  return (
    <>
      {!loading &&
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={customersData} />
      }
    </>
  );
};


export default Customers;
