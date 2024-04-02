import ComplexTable from "../dashboard/components/ComplexTable";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { roomsServices } from "services/rooms";
import AddRooms from "./add";
import Loader from "../loader";

const Room = () => {
  const [roomsdata, setRoomsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex = [
    {
      Header: "Image",
      accessor: "room_image",
    },
    {
      Header: "Hotel Name",
      accessor: "hotel_details[0].hotel_name",
    },
    {
      Header: "Roomtype Name",
      accessor: "roomTypes_details[0].roomtype_name",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Total Rooms",
      accessor: "total_rooms",
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
    getRooms();
  }, []);

  const getRooms = async () => {
    let response = await roomsServices.getAllRooms();
    setRoomsData(response.data);
    setLoading(false);
  };

  const updateStatus = (roomId, status) => {
    Swal.fire({
      icon: "warning",
      title: "Update Status ",
      text: "Are you sure you want to update status?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        roomsServices
          .updateStatus(roomId, status)
          .then((result) => {
            if (result.isSuccessful) {
              Swal.fire({
                title: "Updated",
                text: "Update Status successfully.",
                icon: "success",
                allowOutsideClick: false
              });
              getRooms();
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

  const softDeleteRooms = (roomId) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Room",
      text: "Are you sure you want to delete room?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(roomId);
        roomsServices
          .softDeleteRoom(roomId)
          .then((result) => {
            if (result.isSuccessful) {
              Swal.fire({
                title: "Deleted",
                text: "Room has been deleted successfully.",
                icon: "success",
                allowOutsideClick: false
              });
              getRooms();
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
              Add Room
            </Link>
          </div>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={roomsdata}
            element="rooms"
            deleteElement={softDeleteRooms}
            updateElement={updateStatus}
          />
          <Routes>
            <Route path="/add" element={<AddRooms />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default Room;
