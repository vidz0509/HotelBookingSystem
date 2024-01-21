import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { countriesServices } from "services/countries";
import { Link } from "react-router-dom";
import AddCountry from './add';

const Countries = () => {

  const [countriesData, setCountriesData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex =  [
    {
      Header: "Country Code",
      accessor: "country_code",
    },
    {
      Header: "Country Name",
      accessor: "country_name",
    },
    {
      Header: "Country Images",
      accessor: "country_image",
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
      Header: "Action",
      accessor: "_id",
    },
  ];

  useEffect(() => {
    debugger;
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
        <div className="list-table countries">
          <div className="add-row px-6 mb-5 text-align-right">
            <Link to="add" className="btn btn-primary">Add Country</Link>
          </div>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={countriesData}
          />
          <Routes>
            <Route path='/add' element={<AddCountry />} />
          </Routes>
        </div>
      }
    </>
  );
};

export default Countries;
