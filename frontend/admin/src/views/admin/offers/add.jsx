import React, { useState } from "react";
import InputField from "components/fields/InputField";

import { offersServices } from "services/offers";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
// import { Navigate } from 'react-router-dom';
import Swal from "sweetalert2";


export default function AddOffer() {
  const [offerType, setOfferType] = useState('');
  const [offerCode, setOfferCode] = useState('');

  const [offerTypeError, setOfferTypeError] = useState('');
  const [offerCodeError, setOfferCodeError] = useState('');

  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleOfferTypeChange = (event) => {
    const value = event.target.value;
    setOfferType(value);
  }

  const handleOfferCodeChange = (event) => {
    const value = event.target.value;
    setOfferCode(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOfferTypeError('');
    setOfferCodeError('');
    setError('');
    setSuccessful('');

    if (validation.isEmpty(offerType)) {
      setOfferTypeError("Please enter valid offer type.");
      return false;
    }
    if (validation.isEmpty(offerCode)) {
      setOfferCodeError("Please enter valid offer code.");
      return false;
    }
    setBtnDisabled(true);
    const requestBody = {
      offer_type: offerType,
      offer_code: offerCode,
    };
    const result = await offersServices.addOffers(requestBody);
    if (result.isSuccessful) {
      Swal.fire({
        title: "Added",
        text: "Offer has been added successfully.",
        icon: "success",
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          setBtnDisabled(false);
          window.location.href = '/admin/offers';
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
  };

  return (
    <form>
      <div className=" flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
        {/* Sign in section */}
        <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Offer Type*"
            placeholder="Offer Type*"
            id="offerType"
            type="text"
            onChange={handleOfferTypeChange}
            state={offerTypeError !== "" ? "error" : ""}
            errorMessage={offerTypeError !== "" ? offerTypeError : ""}
            value={offerType}
            maxLength={30}
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Offer Code*"
            placeholder="Offer Code"
            id="offerCode"
            type="text"
            onChange={handleOfferCodeChange}
            state={offerCodeError !== "" ? "error" : ""}
            errorMessage={offerCodeError !== "" ? offerCodeError : ""}
            value={offerCode}
            maxLength={15}
          />
          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
            </div>
            <button className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} onClick={(e) => handleSubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
              {btnDisabled ?
                <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
                : <span>Add Offer</span>}
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