import React, { useState } from "react";
import InputField from "components/fields/InputField";
import { roomtypeServices } from "services/roomtype";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
// import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddRoomType() {
  const [roomtypeName, setRoomTypeName] = useState("");

  const [roomtypeNameError, setRoomTypeNameError] = useState("");

  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleRoomTypeNameChange = (event) => {
    const value = event.target.value;
    setRoomTypeName(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRoomTypeNameError("");
    setError("");
    setSuccessful("");

    if (validation.isEmpty(roomtypeName)) {
      setRoomTypeNameError("Please enter valid roomtype name.");
      return false;
    }

    setBtnDisabled(true);
    const requestBody = {
      roomtype_name: roomtypeName,
    };

    const result = await roomtypeServices.addRoomType(requestBody);
    if (result.isSuccessful) {
      // setSuccessful("Country added successfully")
      Swal.fire({
        title: "Added",
        text: "Roomtype has been Added successfully.",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          setBtnDisabled(false);
          window.location.href = '/admin/roomtype';
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
  };

  return (
    <div className=" flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <InputField
          variant="auth"
          extra="mb-3"
          label="RoomType Name*"
          placeholder="RoomType Name*"
          id="roomtypeName"
          type="text"
          onChange={handleRoomTypeNameChange}
          state={roomtypeNameError !== "" ? "error" : ""}
          errorMessage={roomtypeNameError !== "" ? roomtypeNameError : ""}
          value={roomtypeName}
          maxLength={70}
        />
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
                <img src={btnLoader} className="xl:max-w-[25px]" alt="loader" />
              </span>
            ) : (
              <span>Add RoomType</span>
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
  );
}
