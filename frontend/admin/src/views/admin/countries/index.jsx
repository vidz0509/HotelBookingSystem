import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from 'react';
import { countriesServices } from "services/country"; 

const Countries = () => {

  const [countriesData, setCountriesData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex = [
    {
      Header: "Country Code",
      accessor: "",
    },
    {
      Header: "Country Name",
      accessor: "country_name",
    },
    {
      Header: "Country Images",
      accessor: "country_image",
    },
    {
      Header: "Action",
      accessor: "",
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
  ];


  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    let response = await countriesServices.getAllCountries();
    setCountriesData(response.data);
    setLoading(false);
  }

  return (
    <>
      {!loading &&
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={countriesData}
        />
      }
    </>
  );
};

export default Countries;
