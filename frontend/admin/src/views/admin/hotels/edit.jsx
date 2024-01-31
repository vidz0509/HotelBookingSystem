import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import Dropdown from "components/dropdown";
import { countriesServices } from "services/countries";
import { locationsServices } from "services/locations";
import { hotelsServices } from "services/hotels";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";


export default function EditHotel() {

  const params = useParams();
  const hotelId = params.id;

  // const [hotelData, setHotelData] = useState(null);

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
    getHotelById(hotelId);
    // const result = await hotelsServices.getHotelById(hotelId);
  }, [hotelId]);

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

  const getHotelById = async (hotelId) => {
    const result = await hotelsServices.getHotelById(hotelId);
    if (result.isSuccessful) {
      setCountryId(result.data?.country_id);
      setLocationId(result.data?.location_id);
      setHotelName(result.data?.hotel_name);
      setHotelCode(result.data?.hotel_code);
      setHotelAddress(result.data?.hotel_address);
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

    if (validation.isEmpty(countryId)) {
      setCountryIdError("Please select valid country name.");
      return false;
    }

    if (validation.isEmpty(locationId)) {
      setLocationIdError("Please select valid location name.");
      return false;
    }

    if (validation.isEmpty(hotelName)) {
      setHotelNameError("Please enter valid hotel name.");
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
    const result = await hotelsServices.editHotel(hotelId,requestBody);
    if (result.isSuccessful) {
      // setSuccessful("Country added successfully")
      Swal.fire({
        title: "Edited",
        text: "Hotel has been Edited successfully.",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          setBtnDisabled(false);
          window.location.reload();
          // window.location.href = '/admin/hotels';
          // return <Navigate to="/admin/countries" />
        }
      });
    } else {
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

      <label class="text-sm text-navy-700 dark:text-white ml-1.5 font-medium">Country Name*</label>
        <select id="countryId" name="countryId" onChange={handleCountryIdChange}  class="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark-border dark:!border-white/10 dark:text-white">
          <option value="">-- Select Country --</option>
          {
            countriesData && countriesData.length > 0 && countriesData.map((item) =>
              <option value={item._id} selected={item._id === countryId}>
                {item.country_name}
              </option>
            )
          }
        </select>

      <label class="text-sm text-navy-700 dark:text-white ml-1.5 font-medium">Location Name*</label>
        <select id="locationId" name="locationId" onChange={handleLocationIdChange} class="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark-border dark:!border-white/10 dark:text-white">
          <option value="">-- Select Location --</option>
          {
            locationsData && locationsData.length > 0 && locationsData.map((item) =>
              <option value={item._id} selected={item._id === locationId}>
                {item.location_name}
              </option>
            )
          }
        </select>
        {/* <Dropdown
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
        /> */}
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
       <label class="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">
          Hotel Address*
        </label>
        <textarea rows="4" cols="50" class="dark-border mt-2 flex  w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
          variant="auth"
          extra="mb-3"
          placeholder="Hotel Address"
          id="hotelAddress"
          type="text"
          onChange={handleHotelAddressChange}
          state={hotelAddressError !== "" ? "error" : ""}
          errorMessage={hotelAddressError !== "" ? hotelAddressError : ""}     
          value={hotelAddress}     
        >{hotelAddress}</textarea>

        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
          </div>
          <button className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} onClick={(e) => handleSubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
            {btnDisabled ?
              <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
              : <span>Edit Hotel</span>}
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