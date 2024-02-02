import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { roomtypeServices } from "services/roomtype";
import { Link } from "react-router-dom";
import AddRoomType from "./add";
import Swal from "sweetalert2";

const RoomType = () => {

  const [roomtypeData, setRoomTypeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex =  [
    {
      Header: " Name",
      accessor: "roomtype_name",
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
    getRoomType();
  }, []);

  const getRoomType = async () => {
    let response = await roomtypeServices.getAllRoomType();
    setRoomTypeData(response.data);
    setLoading(false);
  }

  const softDeleteRoomType = (roomtypeId) => {
    Swal.fire({
      icon: "warning",
      title: "Delete RoomType",
      text: "Are you sure you want to delete RoomType?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(roomtypeId);
        roomtypeServices.softDeleteRoomType(roomtypeId).then((result) => {
          if (result.isSuccessful) {
            Swal.fire({
              title: "Deleted",
              text: "RoomType has been deleted successfully.",
              icon: "success"
            });
            getRoomType();
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
            <Link to="add" className="btn btn-primary">Add Room Type</Link>
          </div>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={roomtypeData}
            element='roomtype'
            deleteElement={softDeleteRoomType}
          />
          <Routes>
            <Route path='/add' element={<AddRoomType />} />
          </Routes>
        </div>
      }
    </>
  );
};

export default RoomType;
