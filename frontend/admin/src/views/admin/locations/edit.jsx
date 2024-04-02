import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import Dropdown from "components/dropdown";
import { countriesServices } from "services/countries";
import { locationsServices } from "../../../services/locations";
import { validation } from "../../../services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditLocation() {
  const params = useParams();
  const locationId = params.id;
  const [countriesData, setCountriesData] = useState("");
  const [countryId, setCountryId] = useState("");
  const [countryIdError, setCountryIdError] = useState("");

  // const [locationData, setLocationData] = useState(null);

  const [locationData, setLocationData] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [locationCode, setLocationCode] = useState("");
  const [locationImage, setLocationImage] = useState("");

  const [locationNameError, setLocationNameError] = useState("");
  const [locationCodeError, setLocationCodeError] = useState("");

  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    const result = await countriesServices.getAllCountries();
    if (result.isSuccessful) {
      const activeData = result.data.filter((item) => item.isActive);
      setCountriesData(activeData);
    }
  };

  useEffect(() => {
    getLocationById(locationId);
  }, [locationId]);

  const getLocationById = async (locationId) => {
    const result = await locationsServices.getLocationById(locationId);
    if (result.isSuccessful) {
      setLocationData(result.data);
      setLocationCode(result.data?.location_code);
      setCountryId(result.data?.country_id);
      setLocationName(result.data?.location_name);
    }
  };

  const handleLocationNameChange = (event) => {
    const value = event.target.value;
    setLocationName(value);
  };

  const handleCountryIdChange = (event) => {
    const value = event.target.value;
    setCountryId(value);
  };

  const handleLocationCodeChange = (event) => {
    const value = event.target.value;
    setLocationCode(value);
  };

  const handleimageChange = async (event) => {
    const file = event.target.files[0];
    setLocationImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = false;
    setCountryIdError("");
    setLocationNameError("");
    setLocationCodeError("");
    setError("");
    setSuccessful("");

    if (validation.isEmpty(locationName)) {
      setLocationNameError("Please enter valid location name.");
      return false;
    }
    if (validation.isEmpty(countryId)) {
      setCountryIdError("Please select valid country name.");
      return false;
    }
    if (validation.isEmpty(locationCode)) {
      setLocationCodeError("Please enter valid location code.");
      return false;
    }
    setBtnDisabled(true);
    const requestBody = {
      country_id: countryId,
      location_name: locationName,
      location_code: locationCode,
    };
    const result = await locationsServices.editLocation(
      locationId,
      requestBody
    );
    if (result.isSuccessful) {
      if (locationImage !== "" && locationImage != null) {
        const formData = new FormData();
        formData.append("file", locationImage);
        const imageResponse = await locationsServices.uploadImage(
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
          text: "Location has been Edited successfully.",
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
          <InputField
            variant="auth"
            extra="mb-3"
            label="Location Name*"
            placeholder="Location Name*"
            id="locationName"
            type="text"
            onChange={handleLocationNameChange}
            state={locationNameError !== "" ? "error" : ""}
            errorMessage={locationNameError !== "" ? locationNameError : ""}
            value={locationName}
            maxLength={30}
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

          <InputField
            variant="auth"
            extra="mb-3"
            label="Location Code*"
            placeholder="Location Code"
            id="locationCode"
            type="text"
            onChange={handleLocationCodeChange}
            state={locationCodeError !== "" ? "error" : ""}
            errorMessage={locationCodeError !== "" ? locationCodeError : ""}
            value={locationCode}
            maxLength={5}
          />

          <div className="mb-3">
            <label
              for="image"
              class="mb-2 text-sm font-medium text-navy-700 dark:text-white"
            >
              Location Image
            </label>
            {locationData?.location_image &&
              locationData?.location_image !== "" && (
                <div className="mb-3">
                  <img src={locationData?.location_image} alt={locationName} />
                </div>
              )}
            <input
              type="file"
              variant="auth"
              extra="mt-3"
              label="Location Image"
              placeholder="Location Image"
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
                <span>Edit Location</span>
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
