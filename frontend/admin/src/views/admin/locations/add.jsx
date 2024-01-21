import React, { useState } from "react";
import InputField from "components/fields/InputField";
import Dropdown from "components/dropdown";
import { locationsServices } from "services/locations";
import { validation} from "../../../services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import { Navigate } from 'react-router-dom';

export default function AddLocation() {
  const [locationName, setLocationName] = useState('');
 
  const [locationCode, setLocationCode] = useState('');

  const [locationNameError, setLocationNameError] = useState('');
  const [locationCodeError, setLocationCodeError] = useState('');

  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleLocationNameChange = (event) => {
    const value = event.target.value;
    setLocationName(value);
  }

  const handleLocationCodeChange = (event) => {
    const value = event.target.value;
    setLocationCode(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocationNameError('');
    setLocationCodeError('');
    if (validation.isEmpty(locationName)) {
      setLocationNameError("Please enter valid location name.");
      return false;
    }
    if (validation.isEmpty(locationCode)) {
      setLocationCodeError("Please enter valid location code.");
      return false;
    }
    setBtnDisabled(true);
    const requestBody = {
      location_name: locationName,
      location_code: locationCode,
    };
    const result = await locationsServices.AddLocation(requestBody);
    if (result.isSuccessful) {
      setSuccessful("Location added successfully")
      setBtnDisabled(false);
      return <Navigate to="/admin/locations" replace />
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
         <Dropdown
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
        {/* Checkbox */}
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
  );
}