import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import { countriesServices } from "services/countries";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";


export default function EditCountry() {

  const params = useParams();
  const countryId = params.id;

  const [countryData, setCountryData] = useState(null);
  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [countryImage, setCountryImage] = useState('');

  const [countryNameError, setCountryNameError] = useState('');
  const [countryCodeError, setCountryCodeError] = useState('');

  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    getCountryById(countryId);
  }, [countryId]);

  const getCountryById = async (countryId) => {
    const result = await countriesServices.getCountryById(countryId);
    if (result.isSuccessful) {
      setCountryData(result.data);
      setCountryCode(result.data?.country_code);
      setCountryName(result.data?.country_name);
    }
  }

  const handleCountryNameChange = (event) => {
    const value = event.target.value;
    setCountryName(value);
  }

  const handleCountryCodeChange = (event) => {
    const value = event.target.value;
    setCountryCode(value);
  }

  const handleimageChange = async (event) => {
    const file = event.target.files[0];
    setCountryImage(file);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = false;
    setCountryNameError('');
    setCountryCodeError('');
    setError('');
    setSuccessful('');
    if (validation.isEmpty(countryName)) {
      setCountryNameError("Please enter valid country name.");
      return false;
    }
    if (validation.isEmpty(countryCode)) {
      setCountryCodeError("Please enter valid country code.");
      return false;
    }
    setBtnDisabled(true);
    const requestBody = {
      country_name: countryName,
      country_code: countryCode,
    };
    const result = await countriesServices.editCountry(countryId, requestBody);
    if (result.isSuccessful) {
      if (countryImage !== '' && countryImage != null) {
        const formData = new FormData();
        formData.append("file", countryImage);
        const imageResponse = await countriesServices.uploadImage(formData, result.data._id);
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
          text: "Country has been Edited successfully.",
          icon: "success",
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            setBtnDisabled(false);
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: 'Something went wrong.',
          icon: "error",
          allowOutsideClick: false
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: result.errorMessage,
        icon: "error",
        allowOutsideClick: false
      });
    }
  }

  return (
    <form>
      <div className=" flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
        
        <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Country Name*"
            placeholder="Country Name*"
            id="countryName"
            type="text"
            onChange={handleCountryNameChange}
            state={countryNameError !== "" ? "error" : ""}
            errorMessage={countryNameError !== "" ? countryNameError : ""}
            value={countryName}
            maxLength={30}
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Country Code*"
            placeholder="Country Code"
            id="countryCode"
            type="text"
            onChange={handleCountryCodeChange}
            state={countryCodeError !== "" ? "error" : ""}
            errorMessage={countryCodeError !== "" ? countryCodeError : ""}
            value={countryCode}
            maxLength={5}
          />
          <div className="mb-3">
            <label for="image" class="text-sm text-navy-700 dark:text-white mb-2 font-medium">Country Image</label>
            {countryData?.country_image && countryData?.country_image !== '' &&
              <div className="mb-3">
                <img src={countryData?.country_image} alt={countryName} />
              </div>
            }
            <input type="file"
              variant="auth"
              extra="mt-3"
              label="Country Image"
              placeholder="Country Image"
              id="image"
              onChange={handleimageChange}
            />
          </div>
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
            </div>
            <button className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} onClick={(e) => handleSubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
              {btnDisabled ?
                <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
                : <span>Edit Country</span>}
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
    </form>
  );
}