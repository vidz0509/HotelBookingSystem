import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import { countriesServices } from "services/countries";
import { locationsServices } from "services/locations";
import { amenitiesServices } from "services/amenities";
import { hotelsServices } from "services/hotels";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import Swal from "sweetalert2";
import Checkbox from "components/checkbox";

export default function AddHotel() {
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

  const [hotelNameError, setHotelNameError] = useState("");
  const [hotelCodeError, setHotelCodeError] = useState("");
  const [hotelimage, setHotelImage] = useState("");
  const [totalrooms, setTotalRooms] = useState(0);
  const [totalRoomsError, setTotalRoomsError] = useState("");
  const [hotelAddressError, setHotelAddressError] = useState("");

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    getCountries();
    getAmenities();
  }, []);

  const getCountries = async () => {
    const result = await countriesServices.getAllCountries();
    if (result.isSuccessful) {
      const activeData = result.data.filter((item) => item.isActive);
      setCountriesData(activeData);
    }
  };

  const getLocations = async (country_id) => {
    const result = await locationsServices.getLocationByCountry(country_id);
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

  const handleHotelNameChange = (event) => {
    const value = event.target.value;
    setHotelName(value);
  };

  const handleCountryIdChange = (event) => {
    const value = event.target.value;
    setCountryId(value);
    getLocations(value);
  };

  const handleLocationIdChange = (event) => {
    const value = event.target.value;
    setLocationId(value);
  };

  const handleAmenitiesIdChange = (event) => {
    const value = event.target.value;
    console.log(value);
    if (event.target.checked === true) {
      if(!selectedAmenities.includes(value)){
        setSelectedAmenities((prevalue) => [...prevalue, value]);
      }
    } else {
      const amenities = selectedAmenities.filter((type) => {
        return type !== value;
      });
      setSelectedAmenities(amenities);
    }
  };

  const handleHotelCodeChange = (event) => {
    const value = event.target.value;
    setHotelCode(value);
  };

  const handleimageChange = async (event) => {
    const files = event.target.files;
    setHotelImage(files);
  };

  const handleTotalRoomsChange = (event) => {
    const value = event.target.value;
    setTotalRooms(value);
  };

  const handleHotelAddressChange = (event) => {
    const value = event.target.value;
    setHotelAddress(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = false;
    setHotelNameError("");
    setCountryIdError("");
    setLocationIdError("");
    setAmenitiesIdError("");
    setHotelCodeError("");
    setHotelImage("");
    setHotelAddressError("");
    setTotalRoomsError("");
    setError("");
    setSuccessful("");
    console.log(selectedAmenities);

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

    if (selectedAmenities.length === 0) {
      setAmenitiesIdError("Please select valid amenities name.");
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

    if (validation.isEmpty(totalrooms)) {
      setTotalRooms("Please enter valid total rooms.");
      return false;
    }

    setBtnDisabled(true);
    const requestBody = {
      country_id: countryId,
      location_id: locationId,
      amenities: selectedAmenities,
      hotel_name: hotelName,
      hotel_code: hotelCode,
      hotel_address: hotelAddress,
      total_rooms: totalrooms,
    };
    const result = await hotelsServices.addHotel(requestBody);
    if (result.isSuccessful) {
      console.log(result.data._id);
      /* Upload image */
      if (hotelimage !== "" && hotelimage != null) {
        const formData = new FormData();
        // for (let file of hotelimage) {
        //   formData.append('files', file);
        // }
        for (let i = 0; i < hotelimage.length; i++) {
          const file = hotelimage[i];
          // Append file with a new name
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
          title: "Added",
          text: "hotels has been added successfully.",
          icon: "success",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setBtnDisabled(false);
            window.location.href = "/admin/hotels";
          }
        });
      } else {
        setBtnDisabled(false);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong",
          icon: "error",
          allowOutsideClick: false,
        });
      }
    } else {
      setBtnDisabled(false);
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
        <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[600px]">
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
            class="dark-border mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
            onChange={handleCountryIdChange}
          >
            <option value="">-- Select Country --</option>
            {countriesData &&
              countriesData.length > 0 &&
              countriesData.map((item) => (
                <option value={item._id}>{item.country_name}</option>
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
              class="dark-border mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
              onChange={handleLocationIdChange}
            >
              <option value="">-- Select Location --</option>
              {locationsData &&
                locationsData.length > 0 &&
                locationsData.map((item) => (
                  <option value={item._id}>{item.location_name}</option>
                ))}
            </select>
            {locationIdError && (
              <span className="mb-3 ml-1 text-sm text-red-500">
                {locationIdError}
              </span>
            )}
          </div>

          <div className="mb-3">
            <label className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">
              Amenities Name*
            </label>
            <div className="check-label main-amenities-item-set mt-2 flex flex-wrap text-sm font-medium text-navy-700 dark:text-white">
              {amenitiesData &&
                amenitiesData.map((item) => (
                  <div key={item._id} className="amenities-item-set mb-2">
                    <Checkbox
                      variant="auth"
                      type="checkbox"
                      value={item._id}
                      id={item._id}
                      onChange={handleAmenitiesIdChange}
                      state={amenitiesIdError !== "" ? "error" : ""}
                    />
                    <label htmlFor={item._id} className="ml-1 text-sm">
                      {item.amenities_name}
                    </label>
                  </div>
                ))}
            </div>
            {amenitiesIdError && (
              <span className="ml-1 text-sm text-red-500">
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

          <div className="mb-3">
            <label
              for="image"
              class="text-sm font-medium text-navy-700 dark:text-white"
            >
              Hotel Image
            </label>
            <input
              type="file"
              multiple
              variant="auth"
              extra="mt-3"
              label="Hotel image"
              placeholder="Hotel image"
              id="image"
              onChange={handleimageChange}
            />
          </div>

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
            value={hotelAddress}
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

          {hotelAddressError && (
            <span className="mb-3 ml-1 text-sm text-red-500">
              {hotelAddressError}
            </span>
          )}
          {/* Checkbox */}
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
                <span>Add Hotel</span>
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
