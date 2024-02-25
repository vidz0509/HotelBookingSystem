import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { roomtypeServices } from "services/roomtype";
import { Link } from "react-router-dom";
import AddRoomType from "./add";
import Swal from "sweetalert2";
import Loader from "../loader";

const RoomType = () => {
  const [roomtypeData, setRoomTypeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex = [
    {
      Header: "Name",
      accessor: "roomtype_name",
    },
    {
      Header: "Max. Adults",
      accessor: "max_adults",
    },
    {
      Header: "Max. Children",
      accessor: "max_children",
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
    getRoomType();
  }, []);

  const getRoomType = async () => {
    let response = await roomtypeServices.getAllRoomType();
    setRoomTypeData(response.data);
    setLoading(false);
  };

  const softDeleteRoomType = (roomtypeId) => {
    Swal.fire({
      icon: "warning",
      title: "Delete RoomType",
      text: "Are you sure you want to delete RoomType?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(roomtypeId);
        roomtypeServices
          .softDeleteRoomType(roomtypeId)
          .then((result) => {
            if (result.isSuccessful) {
              Swal.fire({
                title: "Deleted",
                text: "RoomType has been deleted successfully.",
                icon: "success",
                allowOutsideClick: false
              });
              getRoomType();
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

  const updateStatus = (roomtypeId, status) => {
    Swal.fire({
      icon: "warning",
      title: "Update Status ",
      text: "Are you sure you want to update status?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        roomtypeServices.updateStatus(roomtypeId, status).then((result) => {
          if (result.isSuccessful) {
            Swal.fire({
              title: "Updated",
              text: "Update Status successfully.",
              icon: "success",
              allowOutsideClick: false
            });
            getRoomType();
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
        <div className="list-table countries">
          <div className="add-row text-align-right mb-5 px-6">
            <Link to="add" className="btn btn-primary">
              Add Room Type
            </Link>
          </div>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={roomtypeData}
            element="roomtype"
            deleteElement={softDeleteRoomType}
            updateElement={updateStatus}
          />
          <Routes>
            <Route path="/add" element={<AddRoomType />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default RoomType;
