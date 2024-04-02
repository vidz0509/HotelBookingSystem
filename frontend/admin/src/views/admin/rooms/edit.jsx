import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import { roomtypeServices } from "services/roomtype";
import { hotelsServices } from "services/hotels";
import { roomsServices } from "services/rooms";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditRoom() {
  const params = useParams();
  const roomId = params.id;

  const [hotelsData, setHotelsData] = useState("");
  const [roomtypesData, setRoomTypesData] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [roomtypeId, setRoomtypeId] = useState("");
  const [hotelIdError, setHotelIdError] = useState("");
  const [roomtypeIdError, setRoomtypeIdError] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [roomImage, setRoomImage] = useState("");

  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState("");

  const [totalrooms, setTotalRooms] = useState(0);
  const [totalRoomsError, setTotalRoomsError] = useState("");

  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    getRoomById(roomId);
  }, [roomId]);

  useEffect(() => {
    getHotels();
    getRoomType();
  }, []);

  const getHotels = async () => {
    const result = await hotelsServices.getAllHotel();
    if (result.isSuccessful) {
      const activeData = result.data.filter((item) => item.isActive);
      setHotelsData(activeData);
    }
  };

  const getRoomType = async () => {
    const result = await roomtypeServices.getAllRoomType();
    if (result.isSuccessful) {
      const activeData = result.data.filter((item) => item.isActive);
      setRoomTypesData(activeData);
    }
  };

  const getRoomById = async (roomId) => {
    const result = await roomsServices.getRoomById(roomId);
    if (result.isSuccessful) {
      setRoomData(result.data);
      setHotelId(result.data?.hotel_id);
      setRoomtypeId(result.data?.room_type_id);
      setPrice(result.data?.price);
      setTotalRooms(result.data?.total_rooms);
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
    setRoomImage(file);
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

    setBtnDisabled(true);
    const requestBody = {
      hotel_id: hotelId,
      room_type_id: roomtypeId,
      price: parseFloat(price),
      total_rooms: parseInt(totalrooms),
    };

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

    const result = await roomsServices.editRoom(roomId, requestBody);
    if (result.isSuccessful) {
      if (roomImage !== "" && roomImage != null) {
        const formData = new FormData();
        formData.append(
          `file`,
          roomImage,
          `${result.data._id}_.${roomImage.name}`
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
          title: "Edited",
          text: "Room has been Edited successfully.",
          icon: "success",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setBtnDisabled(false);
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          allowOutsideClick: false,
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: result.errorMessage,
        icon: "error",
        allowOutsideClick: false,
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
                <option value={item._id} selected={item._id === hotelId}>
                  {item.hotel_name}
                </option>
              ))}
          </select>
          {hotelIdError && (
            <span className="mb-3 ml-1 text-sm text-red-500">
              {hotelIdError}
            </span>
          )}

          <label class="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">
            Roomtype Name*
          </label>

          <select
            id="roomtypeId"
            name="roomtypeId"
            class="dark-border mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
            onChange={handleRoomtypeIdChange}
          >
            <option value="">-- Select Roomtype --</option>
            {roomtypesData &&
              roomtypesData.length > 0 &&
              roomtypesData.map((item) => (
                <option value={item._id} selected={item._id === roomtypeId}>
                  {item.roomtype_name}
                </option>
              ))}
          </select>
          {roomtypeIdError && (
            <span className="mb-3 ml-1 text-sm text-red-500">
              {roomtypeIdError}
            </span>
          )}

          <InputField
            variant="auth"
            extra="mb-3"
            label="Price*"
            placeholder="Price"
            id="Price"
            type="text"
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
            type="text"
            onChange={handleTotalRoomsChange}
            state={totalRoomsError !== "" ? "error" : ""}
            errorMessage={totalRoomsError !== "" ? totalRoomsError : ""}
            value={totalrooms}
            maxLength={5}
          />

          <div className="mb-3">
            <label
              for="image"
              class="mb-2 text-sm font-medium text-navy-700 dark:text-white"
            >
              Room Image
            </label>
            {roomData?.room_image && roomData?.room_image !== "" && (
              <div className="mb-3">
                <img src={roomData?.room_image} />
              </div>
            )}
            <input
              type="file"
              variant="auth"
              extra="mt-3"
              label="Room Image"
              placeholder="Room Image"
              id="image"
              onChange={handleimageChange}
            />
          </div>

          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center"></div>
            <button
              className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${
                btnDisabled ? "py-[10px] opacity-80" : "py-[12px]"
              }`}
              onClick={(e) => handleSubmit(e)}
              type="submit"
              disabled={btnDisabled ? "disabled" : ""}
            >
              {btnDisabled ? (
                <span className="flex items-center justify-center">
                  <img
                    src={btnLoader}
                    className="xl:max-w-[25px]"
                    alt="loader"
                  />
                </span>
              ) : (
                <span>Edit Room</span>
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
                <p className="mb-9 ml-1 text-base text-green-500">
                  {successful}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
