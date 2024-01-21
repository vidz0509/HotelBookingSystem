import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { locationsServices } from "services/locations"; 
import { Link } from "react-router-dom";
import AddLocation from './add';

const Countries = () => {

  const [locationsData, setLocationsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex = [
    {
      Header: "Location Code",
      accessor: "location_code",
    },
    {
      Header: "Location Name",
      accessor: "location_name",
    },
    {
      Header: "Location Images",
      accessor: "location_image",
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
    getLocations();
  }, []);

  const getLocations = async () => {
    let response = await locationsServices.getAllLocations();
    setLocationsData(response.data);
    setLoading(false);
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
          />
          <Routes>
            <Route path='/add' element={<AddLocation />} />
          </Routes>
        </div>
      }
    </>
  );
};

export default Countries;
