import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import { roomtypeServices } from "services/roomtype";
import { validation } from "services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditRoomType() {
  const params = useParams();
  const roomtypeId = params.id;


  const [roomtypeName, setRoomTypeName] = useState("");
  const [max_adults, setMaxAdults] = useState(1);
  const [max_children, setMaxChildren] = useState(0);

  const [roomtypeNameError, setRoomTypeNameError] = useState("");
  const [max_adultsError, setMaxAdultError] = useState();
  const [max_childrenError, setMaxChildrenError] = useState();

  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    getRoomTypeById(roomtypeId);
  }, [roomtypeId]);

  const getRoomTypeById = async (roomtypeId) => {
    const result = await roomtypeServices.getRoomTypeById(roomtypeId);
    if (result.isSuccessful) {
      setRoomTypeName(result.data?.roomtype_name);
      setMaxAdults(result.data?.max_adults);
      setMaxChildren(result.data?.max_children);
    }
  };

  const handleRoomTypeNameChange = (event) => {
    const value = event.target.value;
    setRoomTypeName(value);
  };

  const handleMaxAdultChange = (event) => {
    const value = event.target.value;
    setMaxAdults(value);
  };

  const handleMaxChildrenChange = (event) => {
    const value = event.target.value;
    setMaxChildren(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRoomTypeNameError("");
    setMaxAdultError("");
    setMaxChildrenError("");
    setError("");
    setSuccessful("");

    if (validation.isEmpty(roomtypeName)) {
      setRoomTypeNameError("Please enter valid roomtype name.");
      return false;
    }

    if (validation.isEmpty(max_adults)) {
      setRoomTypeNameError("Please enter valid maximum adults.");
      return false;
    }

    if (validation.isEmpty(max_children)) {
      setRoomTypeNameError("Please enter valid maximum children.");
      return false;
    }

    setBtnDisabled(true);
    const requestBody = {
      roomtype_name: roomtypeName,
      max_adults: parseInt(max_adults),
      max_children: parseInt(max_children)
    };
    const result = await roomtypeServices.editRoomType(roomtypeId, requestBody);
    if (result.isSuccessful) {
      Swal.fire({
        title: "Edited",
        text: "Roomtype has been Edited successfully.",
        icon: "success",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setBtnDisabled(false);
          window.location.href = "/admin/roomtype/edit/"(roomtypeId);
        }
      });
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
            label="Room type Name*"
            placeholder="Room type Name*"
            id="roomtypeName"
            type="text"
            onChange={handleRoomTypeNameChange}
            state={roomtypeNameError !== "" ? "error" : ""}
            errorMessage={roomtypeNameError !== "" ? roomtypeNameError : ""}
            value={roomtypeName}
            maxLength={70}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Maximun adults*"
            placeholder="Max. adults*"
            id="max_adults"
            type="number"
            onChange={handleMaxAdultChange}
            state={max_adultsError !== "" ? "error" : ""}
            errorMessage={max_adultsError !== "" ? max_adultsError : ""}
            value={max_adults}
            maxLength={200}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Maximum children*"
            placeholder="Max. children*"
            id="max_children"
            type="number"
            onChange={handleMaxChildrenChange}
            state={max_childrenError !== "" ? "error" : ""}
            errorMessage={max_childrenError !== "" ? max_childrenError : ""}
            value={max_children}
            maxLength={200}
          />

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
                <span>Edit Room Type</span>
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
