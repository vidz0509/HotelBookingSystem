import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import Dropdown from "components/dropdown";
import { roomtypeServices } from "services/roomtype";
import { hotelsServices } from "services/hotels";

import { roomsServices } from "services/rooms";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import Swal from "sweetalert2";

export default function AddRooms() {
  const [hotelsData, setHotelsData] = useState("");
  const [roomtypesData, setRoomTypesData] = useState("");
  const [image, setImage] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [roomtypeId, setRoomtypeId] = useState("");
  const [hotelIdError, setHotelIdError] = useState("");
  const [roomtypeIdError, setRoomtypeIdError] = useState("");

  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState("");

  const [totalrooms, setTotalRooms] = useState(0);
  const [totalRoomsError, setTotalRoomsError] = useState("");

  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    getHotels();
    getRoomType();
  }, []);

  const getHotels = async () => {
    const result = await hotelsServices.getAllHotel();
    if (result.isSuccessful) {
      const activeData = result.data.filter(item => item.isActive);
      setHotelsData(activeData);
    }
  };

  const getRoomType = async () => {
    const result = await roomtypeServices.getAllRoomType();
    if (result.isSuccessful) {
      const activeData = result.data.filter(item => item.isActive);
      setRoomTypesData(activeData);
    }
  };

  const handleHotelIdChange = (event) => {
    const value = event.target.value;
    setHotelId(value);
  };

  const handleRoomtypeIdChange = (event) => {
    const value = event.target.value;
    setRoomtypeId(value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const handleTotalRoomsChange = (event) => {
    const value = event.target.value;
    setTotalRooms(value);
  };

  const handleimageChange = async (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = false;
    setHotelIdError("");
    setRoomtypeIdError("");
    setPriceError("");
    setTotalRoomsError("");
    setError("");
    setSuccessful("");

    if (validation.isEmpty(hotelId)) {
      setHotelIdError("Please select valid hotel name.");
      return false;
    }

    if (validation.isEmpty(roomtypeId)) {
      setRoomtypeIdError("Please select valid roomtype name.");
      return false;
    }

    if (validation.isEmpty(price)) {
      setRoomtypeIdError("Please select valid price name.");
      return false;
    }

    if (validation.isEmpty(totalrooms)) {
      setRoomtypeIdError("Please select valid total rooms.");
      return false;
    }

    setBtnDisabled(true);
    const requestBody = {
      hotel_id: hotelId,
      room_type_id: roomtypeId,
      price: parseFloat(price),
      total_rooms: parseInt(totalrooms),
    };

    const result = await roomsServices.addRoom(requestBody);
    if (result.isSuccessful) {
      if (image !== "" && image != null) {
        const formData = new FormData();
        formData.append(
          `file`,
          image,
          `${result.data._id}_.${image.name}`
        );
        const imageResponse = await roomsServices.uploadImage(
          formData,
          result.data._id
        );
        if (imageResponse.isSuccessful) {
          isValid = true;
        } else {
          isValid = false;
        }
      } else {
        isValid = true;
      }
      if (isValid) {
        Swal.fire({
          title: "Added",
          text: "Room has been added successfully.",
          icon: "success",
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            setBtnDisabled(false);
            window.location.href = "/admin/rooms";
          }
        });
      } else {
        setBtnDisabled(false);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong",
          icon: "error",
          allowOutsideClick: false
        });
      }
    } else {
      setBtnDisabled(false);
      Swal.fire({
        title: "Error!",
        text: result.errorMessage,
        icon: "error",
        allowOutsideClick: false
      });
    }
  };

  return (
    <form>
      <div className=" flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
        <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <label class="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">
            Hotel Name*
          </label>
          <select
            id="hotelId"
            name="hotelId"
            class="dark-border mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
            onChange={handleHotelIdChange}
          >
            <option value="">-- Select Hotel --</option>
            {hotelsData &&
              hotelsData.length > 0 &&
              hotelsData.map((item) => (
                <option value={item._id}>{item.hotel_name}</option>
              ))}
          </select>
          {hotelIdError && (
            <span className="mb-3 ml-1 text-sm text-red-500">{hotelIdError}</span>
          )}

          <Dropdown
            variant="auth"
            extra="mb-3"
            label="Hotel Name*"
            placeholder="Hotel Name*"
            id="hotelName"
            type="text"
            onChange={handleHotelIdChange}
            state={hotelIdError !== "" ? "error" : ""}
            errorMessage={hotelIdError !== "" ? hotelIdError : ""}
            value={hotelIdError}
            maxLength={30}
          />

          <label class="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">
            Roomtype Name*
          </label>
          <select
            id="roomtypeId"
            name="roomtypeId "
            class="dark-border mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
            onChange={handleRoomtypeIdChange}
          >
            <option value="">-- Select Roomtype --</option>
            {roomtypesData &&
              roomtypesData.length > 0 &&
              roomtypesData.map((item) => (
                <option value={item._id}>{item.roomtype_name}</option>
              ))}
          </select>
          {hotelIdError && (
            <span className="mb-3 ml-1 text-sm text-red-500">{hotelIdError}</span>
          )}

          <Dropdown
            variant="auth"
            extra="mb-3"
            label="Roomtype Name*"
            placeholder="Roomtype Name*"
            id="roomtypeName"
            type="text"
            onChange={handleRoomtypeIdChange}
            state={roomtypeIdError !== "" ? "error" : ""}
            errorMessage={roomtypeIdError !== "" ? roomtypeIdError : ""}
            value={roomtypeIdError}
            maxLength={30}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Price*"
            placeholder="Price"
            id="Price"
            type="number"
            onChange={handlePriceChange}
            state={priceError !== "" ? "error" : ""}
            errorMessage={priceError !== "" ? priceError : ""}
            value={price}
            maxLength={5}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Total Rooms*"
            placeholder="Total Rooms"
            id="totalRooms"
            type="number"
            onChange={handleTotalRoomsChange}
            state={totalRoomsError !== "" ? "error" : ""}
            errorMessage={totalRoomsError !== "" ? totalRoomsError : ""}
            value={totalrooms}
            maxLength={5}
          />

          <div className="mb-3">
            <label
              for="image"
              class="text-sm font-medium text-navy-700 dark:text-white"
            >
              Room Image
            </label>
            <input
              type="file"
              variant="auth"
              extra="mt-3"
              label="Room image"
              placeholder="Room image"
              id="image"
              onChange={handleimageChange}
            />
          </div>

          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center"></div>
            <button
              className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? "py-[10px] opacity-80" : "py-[12px]"
                }`}
              onClick={(e) => handleSubmit(e)}
              type="submit"
              disabled={btnDisabled ? "disabled" : ""}
            >
              {btnDisabled ? (
                <span className="flex items-center justify-center">
                  <img src={btnLoader} className="xl:max-w-[25px]" alt="loader" />
                </span>
              ) : (
                <span>Add Room</span>
              )}
            </button>
          </div>
          <div className="mt-4">
            {error !== "" && (
              <>
                <p className="mb-9 ml-1 text-base text-red-500">{error}</p>
              </>
            )}
          </div>

          <div className="mt-4">
            {successful !== "" && (
              <>
                <p className="mb-9 ml-1 text-base text-green-500">{successful}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
