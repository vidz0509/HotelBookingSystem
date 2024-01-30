import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import { amenitiesServices } from "services/amenities";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";


export default function EditAmenities() {

  const params = useParams();
  const amenitiesId = params.id;

  // const [amenitiesData, setamenitiesData] = useState(null);

  const [amenitiesName, setAmenitiesName] = useState('');

  const [amenitiesNameError, setAmenitiesNameError] = useState('');

  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    getAmenitiesById(amenitiesId);
    // const result = await amenitiesServices.getamenitiesById(amenitiesId);
  }, [amenitiesId]);

  const getAmenitiesById = async (amenitiesId) => {
    const result = await amenitiesServices.getAmenitiesById(amenitiesId);
    if (result.isSuccessful) {
      // setamenitiesData(result.data);
      setAmenitiesName(result.data?.amenities_name);
    }
  }

  const handleAmenitiesNameChange = (event) => {
    const value = event.target.value;
    setAmenitiesName(value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setAmenitiesNameError('');
    setSuccessful('');

    if (validation.isEmpty(amenitiesName)) {
      setAmenitiesNameError("Please enter valid amenities name.");
      return false;
    }

    setBtnDisabled(true);
    const requestBody = {
      amenities_name: amenitiesName,
    };
    const result = await amenitiesServices.editAmenities(amenitiesId,requestBody);
    if (result.isSuccessful) {
      // setSuccessful("Country added successfully")
      Swal.fire({
        title: "Added",
        text: "Country has been Added successfully.",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          setBtnDisabled(false);
          window.location.href = '/admin/amenities';
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
          label="Amenities Name*"
          placeholder="amenities Name*"
          id="amenitiesName"
          type="text"
          onChange={handleAmenitiesNameChange}
          state={amenitiesNameError !== "" ? "error" : ""}
          errorMessage={amenitiesNameError !== "" ? amenitiesNameError : ""}
          value={amenitiesName}
          maxLength={70}
        />

        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
          </div>
          <button className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} onClick={(e) => handleSubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
            {btnDisabled ?
              <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
              : <span>Edit amenities</span>}
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