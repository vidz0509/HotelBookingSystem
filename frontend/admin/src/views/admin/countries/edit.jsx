import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import { countriesServices } from "services/countries";  
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import { Navigate, useParams } from 'react-router-dom';

export default function EditCountry() {

  const params = useParams();
  const countryId = params.id;

  const [countryData, setCountryData] = useState(null);

  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const [countryNameError, setCountryNameError] = useState('');
  const [countryCodeError, setCountryCodeError] = useState('');

  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    getCountryById(countryId);
    // const result = await countriesServices.getCountryById(countryId);
  }, [countryId]);

  const getCountryById = async () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCountryNameError('');
    setCountryCodeError('');
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
    const result = await countriesServices.editCountry(countryId,requestBody);
    if (result.isSuccessful) {
      setSuccessful("Country updated successfully")
      setBtnDisabled(false);
    } else {
      setError(result.errorMessage);
      setSuccessful(result.errorMessage);
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
        {/* Checkbox */}
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
  );
}