import React, { useState } from "react";
import InputField from "components/fields/InputField";

import { countriesServices } from "services/countries";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import Swal from "sweetalert2";


export default function AddCountry() {
  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [image, setimage] = useState('');

  const [countryNameError, setCountryNameError] = useState('');
  const [countryCodeError, setCountryCodeError] = useState('');


  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

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
    setimage(file);
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
    const result = await countriesServices.addCountry(requestBody);
    if (result.isSuccessful) {
      console.log(result.data._id);
      if (image !== '' && image != null) {
        const formData = new FormData();
        formData.append("file", image);
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
          title: "Added",
          text: "Country has been added successfully.",
          icon: "success",
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            setBtnDisabled(false);
            window.location.href = '/admin/countries';
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
            <label for="image" class="text-sm text-navy-700 dark:text-white font-medium">Country Image</label>
            <input type="file"
              variant="auth"
              extra="mt-3"
              label="Country image"
              placeholder="Country image"
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
                : <span>Add Country</span>}
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