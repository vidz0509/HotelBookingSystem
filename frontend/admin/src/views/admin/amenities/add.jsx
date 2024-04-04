import React, { useState } from "react";
import InputField from "components/fields/InputField";
import { amenitiesServices } from "services/amenities";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
// import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddAmenities() {
  const [amenitiesName, setAmenitiesName] = useState("");
  const [amenitiesNameError, setAmenitiesNameError] = useState("");

  const [amenitiesIcon, setAmenitiesIcon] = useState("");
  const [amenitiesIconError, setAmenitiesIconError] = useState("");

  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleAmenitiesNameChange = (event) => {
    const value = event.target.value;
    setAmenitiesName(value);
  };

  const handleAmenitiesIconChange = (event) => {
    const value = event.target.value;
    setAmenitiesIcon(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAmenitiesNameError("");
    setAmenitiesIconError("");
    setError("");
    setSuccessful("");

    if (validation.isEmpty(amenitiesName)) {
      setAmenitiesNameError("Please enter valid amenities name.");
      return false;
    }

    if (validation.isEmpty(amenitiesIcon)) {
      setAmenitiesIconError("Please enter valid amenities icon.");
      return false;
    }

    setBtnDisabled(true);
    const requestBody = {
      amenities_name: amenitiesName,
      amenities_icon: amenitiesIcon,
    };

    const result = await amenitiesServices.addAmenities(requestBody);
    if (result.isSuccessful) {
      Swal.fire({
        title: "Added",
        text: "Aminities has been Added successfully.",
        icon: "success",
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          setBtnDisabled(false);
          window.location.href = '/admin/amenities';
        }
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: result.errorMessage,
        icon: "error",
        allowOutsideClick: false
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
            label="Amenities Name*"
            placeholder="Amenities Name*"
            id="amenitiesName"
            type="text"
            onChange={handleAmenitiesNameChange}
            state={amenitiesNameError !== "" ? "error" : ""}
            errorMessage={amenitiesNameError !== "" ? amenitiesNameError : ""}
            value={amenitiesName}
            maxLength={70}
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Amenities Icon*"
            placeholder="Amenities Icon*"
            id="amenitiesIcon"
            type="text"
            onChange={handleAmenitiesIconChange}
            state={amenitiesIconError !== "" ? "error" : ""}
            errorMessage={amenitiesIconError !== "" ? amenitiesIconError : ""}
            value={amenitiesIcon}
            maxLength={70}
          />
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center"></div>
            <button
              className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? "py-[10px] opacity-80" : "py-[12px]"
                }`}
              onClick={(e) => handleSubmit(e)}
              type="submit"
              disabled={btnDisabled ? "disabled" : ""}
            >
              {btnDisabled ? (
                <span className="flex items-center justify-center">
                  <img src={btnLoader} className="xl:max-w-[25px]" alt="loader" />
                </span>
              ) : (
                <span>Add Amenities</span>
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
                <p className="mb-9 ml-1 text-base text-green-500">{successful}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
