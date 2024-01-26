import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import Dropdown from "components/dropdown";
import { countriesServices } from "services/countries";
import { locationsServices } from "services/locations";
import { hotelsServices } from "services/hotels";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import { Navigate } from 'react-router-dom';

export default function AddHotel() {
  const [countriesData, setCountriesData] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [countryId, setCountryId] = useState('');

  const [locationsData, setLocationsData] = useState('');
  const [locationId, setLocationId] = useState('');

  const [hotelCode, setHotelCode] = useState('');
  const [hotelAddress, setHotelAddress] = useState('');


  const [countryIdError, setCountryIdError] = useState('');
  const [locationIdError, setLocationIdError] = useState('');


  const [hotelNameError, setHotelNameError] = useState('');
  const [hotelCodeError, setHotelCodeError] = useState('');
  const [hotelAddressError, setHotelAddressError] = useState('');

  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => { 
    getLocations();
  }, []);

  const getCountries = async () => {
    const result = await countriesServices.getAllCountries();
    if (result.isSuccessful) {
      setCountriesData(result.data);
    }
  }

  const getLocations = async () => {
    const result = await locationsServices.getAllLocations();
    if (result.isSuccessful) {
      setLocationsData(result.data);
    }
  }

  const handleHotelNameChange = (event) => {
    const value = event.target.value;
    setHotelName(value);
  }

  const handleCountryIdChange = (event) => {
    const value = event.target.value;
    setCountryId(value);
  }

  const handleLocationIdChange = (event) => {
    const value = event.target.value;
    setLocationId(value);
  }

  const handleHotelCodeChange = (event) => {
    const value = event.target.value;
    setHotelCode(value);
  }

  const handleHotelAddressChange = (event) => {
    const value = event.target.value;
    setHotelAddress(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setHotelNameError('');
    setCountryIdError('');
    setLocationIdError('');
    setHotelCodeError('');
    setHotelAddressError('');
    setSuccessful('');

    if (validation.isEmpty(hotelName)) {
      setHotelNameError("Please enter valid hotel name.");
      return false;
    }
    
    if (validation.isEmpty(countryId)) {
      setCountryIdError("Please select valid country name.");
      return false;
    }

    if (validation.isEmpty(locationId)) {
      setLocationIdError("Please select valid location name.");
      return false;
    }

    if (validation.isEmpty(hotelCode)) {
      setHotelCodeError("Please enter valid hotel code.");
      return false;
    }

    if (validation.isEmpty(hotelAddress)) {
      setHotelAddressError("Please enter valid hotel address.");
      return false;
    }

    setBtnDisabled(true);
    const requestBody = {
      country_id: countryId,
      location_id: locationId,
      hotel_name: hotelName,
      hotel_code: hotelCode,
      hotel_address: hotelAddress,
    };
    const result = await hotelsServices.addHotel(requestBody);
    if (result.isSuccessful) {
      setSuccessful("Hotel added successfully")
      setBtnDisabled(false);
      return <Navigate to="/admin/hotels" replace />
    } else {
      setError(result.errorMessage);
      // setSuccessful(result.errorMessage);
      setBtnDisabled(false);
    }
  }

  return (
    <div className=" flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <InputField
          variant="auth"
          extra="mb-3"
          label="Hotel Name*"
          placeholder="Hotel Name*"
          id="hotelName"
          type="text"
          onChange={handleHotelNameChange}
          state={hotelNameError !== "" ? "error" : ""}
          errorMessage={hotelNameError !== "" ? hotelNameError : ""}
          value={hotelName}
          maxLength={70}
        />
        <select id="countryId" name="countryId" onChange={handleCountryIdChange}>
          <option value="">-- Select Country --</option>
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
        <select id="locationId" name="locationId" onChange={handleLocationIdChange}>
          <option value="">-- Select Location --</option>
          {
            locationsData && locationsData.length > 0 && locationsData.map((item) =>
              <option value={item._id}>
                {item.location_name}
              </option>
            )
          }
        </select>
        <Dropdown
          variant="auth"
          extra="mb-3"
          label="Location Name*"
          placeholder="Location Name*"
          id="locationName"
          type="text"
          onChange={handleLocationIdChange}
          state={locationIdError !== "" ? "error" : ""}
          errorMessage={locationIdError !== "" ? locationIdError : ""}
          value={locationId}
          maxLength={30}
        />
        <InputField
          variant="auth"
          extra="mb-3"
          label="Hotel Code*"
          placeholder="Hotel Code"
          id="hotelCode"
          type="text"
          onChange={handleHotelCodeChange}
          state={hotelCodeError !== "" ? "error" : ""}
          errorMessage={hotelCodeError !== "" ? hotelCodeError : ""}
          value={hotelCode}
          maxLength={5}
        />
        <InputField
          variant="auth"
          extra="mb-3"
          label="Hotel Address*"
          placeholder="Hotel Address"
          id="hotelAddress"
          type="text"
          onChange={handleHotelAddressChange}
          state={hotelAddressError !== "" ? "error" : ""}
          errorMessage={hotelAddressError !== "" ? hotelAddressError : ""}
          value={hotelAddress}
          maxLength={60}
        />
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
          </div>
          <button className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} onClick={(e) => handleSubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
            {btnDisabled ?
              <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
              : <span>Add Hotel</span>}
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