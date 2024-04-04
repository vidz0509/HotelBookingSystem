import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import { countriesServices } from "services/countries";
import { locationsServices } from "services/locations";
import { amenitiesServices } from "services/amenities";
import { hotelsServices } from "services/hotels";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditHotel() {
  const params = useParams();
  const hotelId = params.id;

  // const [hotelData, setHotelData] = useState(null);

  const [countriesData, setCountriesData] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [countryId, setCountryId] = useState("");

  const [locationsData, setLocationsData] = useState("");
  const [locationId, setLocationId] = useState("");

  const [amenitiesData, setAmenitiesData] = useState("");
  const [amenitiesId, setAmenitiesId] = useState("");

  const [hotelCode, setHotelCode] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");

  const [countryIdError, setCountryIdError] = useState("");
  const [locationIdError, setLocationIdError] = useState("");
  const [amenitiesIdError, setAmenitiesIdError] = useState("");

  const [hotelData, setHotelData] = useState(null);
  const [hotelNameError, setHotelNameError] = useState("");
  const [hotelCodeError, setHotelCodeError] = useState("");
  const [hotelAddressError, setHotelAddressError] = useState("");
  const [hotelimage, setHotelImage] = useState("");

  const [totalrooms, setTotalRooms] = useState(0);
  const [totalRoomsError, setTotalRoomsError] = useState("");

  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    getHotelById(hotelId);
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
      const activeData = result.data.filter((item) => item.isActive);
      setCountriesData(activeData);
    }
  };

  const getLocations = async () => {
    const result = await locationsServices.getAllLocations();
    if (result.isSuccessful) {
      const activeData = result.data.filter((item) => item.isActive);
      setLocationsData(activeData);
    }
  };

  const getAmenities = async () => {
    const result = await amenitiesServices.getAllAmenities();
    if (result.isSuccessful) {
      const activeData = result.data.filter((item) => item.isActive);
      setAmenitiesData(activeData);
    }
  };

  const getHotelById = async (hotelId) => {
    const result = await hotelsServices.getHotelById(hotelId);
    if (result.isSuccessful) {
      setHotelData(result.data);
      setCountryId(result.data?.country_id);
      setLocationId(result.data?.location_id);
      setAmenitiesId(result.data?.amenities_id);
      setHotelName(result.data?.hotel_name);
      setHotelCode(result.data?.hotel_code);
      setHotelAddress(result.data?.hotel_address);
      setTotalRooms(result.data?.total_rooms);
    }
  };

  const handleHotelNameChange = (event) => {
    const value = event.target.value;
    setHotelName(value);
  };

  const handleCountryIdChange = (event) => {
    const value = event.target.value;
    setCountryId(value);
    setLocationId(value);
    getAmenities(value);
  };

  const handleLocationIdChange = (event) => {
    const value = event.target.value;
    setLocationId(value);
  };

  const handleAmenitiesIdChange = (event) => {
    const value = event.target.value;
    setAmenitiesId(value);
  };

  const handleHotelCodeChange = (event) => {
    const value = event.target.value;
    setHotelCode(value);
  };

  const handleHotelAddressChange = (event) => {
    const value = event.target.value;
    setHotelAddress(value);
  };

  const handleimageChange = async (event) => {
    const files = event.target.files;
    setHotelImage(files);
  };

  const handleTotalRoomsChange = (event) => {
    const value = event.target.value;
    setTotalRooms(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = false;
    setHotelNameError("");
    setCountryIdError("");
    setLocationIdError("");
    setAmenitiesIdError("");
    setHotelCodeError("");
    setHotelAddressError("");
    setHotelImage("");
    setTotalRoomsError("");
    setError("");
    setSuccessful("");

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

    if (validation.isEmpty(amenitiesId)) {
      setAmenitiesIdError("Please select valid amenities name.");
      return false;
    }

    if (validation.isEmpty(hotelAddress)) {
      setHotelAddressError("Please enter valid hotel address.");
      return false;
    }

    if (validation.isEmpty(totalrooms)) {
      setTotalRooms("Please enter valid total rooms.");
      return false;
    }

    setBtnDisabled(true);
    const requestBody = {
      country_id: countryId,
      location_id: locationId,
      amenities_id: amenitiesId,
      hotel_name: hotelName,
      hotel_code: hotelCode,
      hotel_address: hotelAddress,
      total_rooms: totalrooms,
    };

    const result = await hotelsServices.editHotel(hotelId, requestBody);
    if (result.isSuccessful) {
      if (hotelimage !== "" && hotelimage != null) {
        const formData = new FormData();
        for (let i = 0; i < hotelimage.length; i++) {
          const file = hotelimage[i];
          formData.append(
            `files[${i}]`,
            file,
            `${result.data._id}_.${file.name}`
          );
        }
        const imageResponse = await hotelsServices.uploadImage(
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
          text: "Hotel has been Edited successfully.",
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
          text: result.errorMessage,
          icon: "error",
          allowOutsideClick: false,
        });
      }
    }
  };

  return (
    <form>
      <div className=" flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
        <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0">
          <div className="hotel-data-fields xl:max-w-[420px]">
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

            <label class="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">
              Country Name*
            </label>
            <select
              id="countryId"
              name="countryId"
              onChange={handleCountryIdChange}
              class="dark-border mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
            >
              <option value="">-- Select Country --</option>
              {countriesData &&
                countriesData.length > 0 &&
                countriesData.map((item) => (
                  <option value={item._id} selected={item._id === countryId}>
                    {item.country_name}
                  </option>
                ))}
            </select>
            {countryIdError && (
              <span className="mb-3 ml-1 text-sm text-red-500">
                {countryIdError}
              </span>
            )}

            <div className="mb-3">
              <label class="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">
                Location Name*
              </label>
              <select
                id="locationId"
                name="locationId"
                onChange={handleLocationIdChange}
                class="dark-border mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
              >
                <option value="">-- Select Location --</option>
                {locationsData &&
                  locationsData.length > 0 &&
                  locationsData.map((item) => (
                    <option value={item._id} selected={item._id === locationId}>
                      {item.location_name}
                    </option>
                  ))}
              </select>
              {locationIdError && (
                <span className="mb-3 ml-1 text-sm text-red-500">
                  {locationIdError}
                </span>
              )}
            </div>

            <div className="mb-3">
              <label class="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">
                Amenitites Name*
              </label>
              <select
                id="amenitiesId"
                name="amenitiesId"
                class="dark-border mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
                onChange={handleAmenitiesIdChange}
              >
                <option value="">-- Select Amenities --</option>
                {amenitiesData &&
                  amenitiesData.length > 0 &&
                  amenitiesData.map((item) => (
                    <option value={item._id}>{item.amenities_name}</option>
                  ))}
              </select>
              {amenitiesIdError && (
                <span className="mb-3 ml-1 text-sm text-red-500">
                  {amenitiesIdError}
                </span>
              )}
            </div>

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
              label="Total Rooms*"
              placeholder="Total Rooms*"
              id="totalRooms"
              type="text"
              onChange={handleTotalRoomsChange}
              state={totalRoomsError !== "" ? "error" : ""}
              errorMessage={totalRoomsError !== "" ? totalRoomsError : ""}
              value={totalrooms}
              maxLength={5}
            />

            <label class="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">
              Hotel Address*
            </label>
            <textarea
              rows="4"
              cols="50"
              class="dark-border mt-2 flex  w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
              variant="auth"
              extra="mb-3"
              placeholder="Hotel Address"
              id="hotelAddress"
              type="text"
              onChange={handleHotelAddressChange}
              state={hotelAddressError !== "" ? "error" : ""}
              errorMessage={hotelAddressError !== "" ? hotelAddressError : ""}
              value={hotelAddress}
            />
            {hotelAddressError && (
              <span className="mb-3 ml-1 text-sm text-red-500">
                {hotelAddressError}
              </span>
            )}
          </div>

          <div className="mb-3">
            <label
              for="image"
              class="mb-2 text-sm font-medium text-navy-700 dark:text-white"
            >
              Hotel Image
            </label>
            {hotelData?.hotel_image && (
              <div className="hotel-imgs mb-3 flex">
                {Array.isArray(hotelData?.hotel_image) ? (
                  hotelData?.hotel_image.map((img, index) => (
                    <img
                      src={img}
                      alt={hotelName}
                      key={`img_${index}`}
                      className="hotelImg mx-2 my-2"
                    />
                  ))
                ) : (
                  <>
                    <img src={hotelData?.hotel_image} alt={hotelName} />
                  </>
                )}
              </div>
            )}
            <input
              type="file"
              multiple
              variant="auth"
              extra="mt-3"
              label="Hotel Image"
              placeholder="Hotel Image"
              id="image"
              onChange={handleimageChange}
            />
          </div>

          <div className="hotel-data-fields xl:max-w-[420px]">
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
                  <span>Edit Hotel</span>
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
      </div>
    </form>
  );
}
