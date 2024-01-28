import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import Dropdown from "components/dropdown";
import { countriesServices } from "services/countries";

import { roomtypesServices } from "services/roomtypes";
import { validation } from "../../../services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import { Navigate } from 'react-router-dom';

// export  function AllCountry() {
//   const [countryName, setCountryName] =useState('');
//   const [countryNameError, setCountryNameError] = useState('');


//   const handleCountryNameChange = (event) => {
//     const value = event.target.value;
//     setCountryName(value);
//   }


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setCountryNameError('');
//     if (validation.isEmpty(roomtypeName)) {
//       setRoomTypeNameError("Please enter valid roomtype name.");
//       return false;
//     }
// }


export default function AddRoomType() {
  const [roomtypeName, setRoomTypeName] = useState('');
  const [countryId, setCountryId] = useState('');


  const [roomtypeCode, setRoomTypeCode] = useState('');

  const [roomtypeNameError, setRoomTypeNameError] = useState('');
  const [roomtypeCodeError, setRoomTypeCodeError] = useState('');

  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);



  const handleRoomTypeNameChange = (event) => {
    const value = event.target.value;
    setRoomTypeName(value);
  }

  const handleRoomTypeCodeChange = (event) => {
    const value = event.target.value;
    setRoomTypeCode(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRoomTypeNameError('');
    setCountryIdError('');
    setRoomTypeCodeError('');
    if (validation.isEmpty(roomtypeName)) {
      setRoomTypeNameError("Please enter valid roomtype name.");
      return false;
    }
    if (validation.isEmpty(countryId)) {
      setCountryIdError("Please select valid country name.");
      return false;
    }
    if (validation.isEmpty(roomtypeCode)) {
      setRoomTypeCodeError("Please enter valid roomtype code.");
      return false;
    }
    setBtnDisabled(true);
    const requestBody = {
      country_id: countryId,
      roomtype_name: roomtypeName,
      roomtype_code: roomtypeCode,
    };
    const result = await roomtypesServices.addRoomType(requestBody);
    if (result.isSuccessful) {
      setSuccessful("RoomType added successfully")
      setBtnDisabled(false);
      return <Navigate to="/admin/roomtypes/" replace />
    } else {
      setError(result.errorMessage);
      setSuccessful(result.successfulMessage);
      setBtnDisabled(false);
    }
  }

  return (
    <div className=" flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <InputField
          variant="auth"
          extra="mb-3"
          label="RoomType Name*"
          placeholder="RoomType Name*"
          id="roomtypeName"
          type="text"
          onChange={handleRoomTypeNameChange}
          state={roomtypeNameError !== "" ? "error" : ""}
          errorMessage={roomtypeNameError !== "" ? roomtypeNameError : ""}
          value={roomtypeName}
          maxLength={30}
        />
        
        <label class="text-sm text-navy-700 dark:text-white ml-1.5 font-medium">Country Name*</label>
        <select id="countryId" name="countryId" class="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark-border dark:!border-white/10 dark:text-white" onChange={handleCountryIdChange}>
          <option value="" >-- Select Country --</option>
          {
            countriesData && countriesData.length > 0 && countriesData.map((item) =>
              <option value={item._id}>
                {item.country_name}
              </option>
            )
          }
        </select>

        <Dropdown
          variant="auth"
          extra="mb-3"
          label="Country Name*"
          placeholder="Country Name*"
          id="countryName"
          type="text"
          onChange={handleCountryIdChange}
          state={countryIdError !== "" ? "error" : ""}
          errorMessage={countryIdError !== "" ? countryIdError : ""}
          value={countryId}
          maxLength={30}
        />
        <InputField
          variant="auth"
          extra="mb-3"
          label="RoomType Code*"
          placeholder="RoomType Code"
          id="roomtypeCode"
          type="text"
          onChange={handleRoomTypeCodeChange}
          state={roomtypeCodeError !== "" ? "error" : ""}
          errorMessage={roomtypeCodeError !== "" ? roomtypeCodeError : ""}
          value={roomtypeCode}
          maxLength={5}
        />
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
          </div>
          <button className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} onClick={(e) => handleSubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
            {btnDisabled ?
              <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
              : <span>Add RoomType</span>}
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