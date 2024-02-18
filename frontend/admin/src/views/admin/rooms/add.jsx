import React, { useState } from "react";
import InputField from "components/fields/InputField";

import { roomsServices } from "services/rooms";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
// import { Navigate } from 'react-router-dom';
import Swal from "sweetalert2";


export default function AddRooms() {
  const [roomName, setRoomName] = useState('');
  const [image, setimage] = useState('');

  const [roomNameError, setRoomNameError] = useState('');


  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleRoomNameChange = (event) => {
    const value = event.target.value;
    setRoomName(value);
  }

  const handleimageChange = async (event) => {
    const file = event.target.files[0];
    setimage(file);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = false;
    setRoomNameError('');
    setError('');
    setSuccessful('');

    if (validation.isEmpty(roomName)) {
      setRoomNameError("Please enter valid room name.");
      return false;
    }
     
    setBtnDisabled(true);
    const requestBody = {
      room_name: roomName,
    };
    
    const result = await roomsServices.addRoom(requestBody);
    if (result.isSuccessful) {
      console.log(result.data._id);
      /* Upload image */
      if (image !== '' && image != null) {
        const formData = new FormData();
        formData.append("file", image);
        const imageResponse = await roomsServices.uploadImage(formData, result.data._id);
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
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            setBtnDisabled(false);
            window.location.href = '/admin/rooms';
          }
        });
      } else {
        setBtnDisabled(false);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong",
          icon: "error"
        });
      }
    } else {
      setBtnDisabled(false);
      Swal.fire({
        title: "Error!",
        text: result.errorMessage,
        icon: "error"
      });
    }
  }

  return (
    <div className=" flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <InputField
          variant="auth"
          extra="mb-3"
          label="Room Name*"
          placeholder="Room Name*"
          id="roomName"
          type="text"
          onChange={handleRoomNameChange}
          state={roomNameError !== "" ? "error" : ""}
          errorMessage={roomNameError !== "" ? roomNameError : ""}
          value={roomName}
          maxLength={30}
        />

        <div className="mb-3">
          <label for="image" class="text-sm text-navy-700 dark:text-white font-medium">Room Image</label>
          <input type="file"
            variant="auth"
            extra="mt-3"
            label="Room image"
            placeholder="Room image"
            id="image"
            onChange={handleimageChange}
          />
        </div>
        
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
          </div>
          <button className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} onClick={(e) => handleSubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
            {btnDisabled ?
              <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
              : <span>Add Room</span>}
          </button>
        </div>
        <div className="mt-4">
          {error !== '' && <>
            <p className="mb-9 ml-1 text-base text-red-500">{error}</p>
          </>}
        </div>

        <div className="mt-4">
          {successful !== '' && <>
            <p className="mb-9 ml-1 text-base text-green-500">{successful}</p>
          </>}
        </div>
      </div>
    </div>
  );
}