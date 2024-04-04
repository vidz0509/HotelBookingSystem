import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import { authServices } from "../../../services/auth";
import { validation } from "../../../services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import Swal from "sweetalert2";

import {
  MdRemoveRedEye,
  MdOutlineRemoveRedEye,
} from "react-icons/md";

export default function ChangePassword() {
  const [password, setpassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [passwordType, setPasswordType] = useState("password");
  const [newpasswordType, setNewPasswordType] = useState("password");
  const [confirmpasswordType, setConfirmPasswordType] = useState("password");

  const [passwordError, setpasswordError] = useState('');
  const [newPasswordError, setnewPasswordError] = useState('');
  const [confirmPasswordError, setconfirmPasswordError] = useState('');
  const [isSuccessfull, setSuccessfull] = useState(false);

  const [error, setError] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const toggleNewPassword = (e) => {
    e.preventDefault();
    if (newpasswordType === "password") {
      setNewPasswordType("text")
      return;
    }
    setNewPasswordType("password")
  }

  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    if (confirmpasswordType === "password") {
      setConfirmPasswordType("text")
      return;
    }
    setConfirmPasswordType("password")
  }


  const handlepasswordChange = (event) => {
    clearErrors();
    const value = event.target.value;
    setpassword(value);
  }
  const handlenewPasswordChange = (event) => {
    clearErrors();
    const value = event.target.value;
    setnewPassword(value);
  }
  const handleconfirmPasswordChange = (event) => {
    clearErrors();
    const value = event.target.value;
    setconfirmPassword(value);
  }
  useEffect(() => {
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setpasswordError('');
    setnewPasswordError('');
    setconfirmPasswordError('');
    setSuccessfull('');
    if (validation.isEmpty(password)) {
      setpasswordError("Please enter valid password.");
      return false;
    }
    if (validation.isEmpty(newPassword)) {
      setnewPasswordError("Please enter valid new Password.");
      return false;
    }
    if (validation.isEmpty(confirmPassword)) {
      setconfirmPasswordError("Please enter valid confirmPassword.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password must be same.");
      return false;
    }

    if (confirmPassword.length < 8) {
      setError("Password must be 8 characters long.");
      return false;
    }

    if (!validation.isValidPassword(confirmPassword)) {
      setError("Password must have at least one digit, one special chacter and one uppercase letter");
      return false;
    }
    clearErrors();
    setBtnDisabled(false);
    const currentUser = authServices.getCurrentUser();
    const requestBody = {
      email: currentUser.email,
      password: password,
      newpassword: newPassword,
    };
    const result = await authServices.changepassword(requestBody);
    if (result.isSuccessful) {
      Swal.fire({
        title: "Success",
        text: "Password changed successfully.",
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
        text: result.errorMessage,
        icon: "error",
        allowOutsideClick: false
      })
        .then((result) => {
          if (result.isConfirmed) {
            setBtnDisabled(false);
            window.location.reload();
          }
        });
    }
  }
  const clearErrors = () => {
    setconfirmPasswordError('');
    setnewPasswordError('');
    setpasswordError('');
  }

  return (
    <form>
      <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
        <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <div className={`field${passwordError !== "" ? " has-error" : ""}`}>
            <InputField
              variant="auth"
              extra="mb-3"
              label=" Password*"
              placeholder="********"
              id="password"
              type={passwordType}
              onChange={handlepasswordChange}
              state={passwordError !== "" ? "error" : ""}
              errorMessage={passwordError !== "" ? passwordError : ""}
              maxLength={12}
            />
            <button className="icon" type="button" onClick={togglePassword}>{passwordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
          </div>
          <div className={`field${newPasswordError !== "" ? " has-error" : ""}`}>
            <InputField
              variant="auth"
              extra="mb-3"
              label="New Password*"
              placeholder="********"
              id="newPassword"
              type={newpasswordType}
              onChange={handlenewPasswordChange}
              state={newPasswordError !== "" ? "error" : ""}
              errorMessage={newPasswordError !== "" ? newPasswordError : ""}
              maxLength={12}
            />
            <button className="icon" type="button" onClick={toggleNewPassword}>{newpasswordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
          </div>
          <div className={`field${confirmPasswordError !== "" ? " has-error" : ""}`}>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Confirm Password*"
              placeholder="********"
              id="confirmPassword"
              type={confirmpasswordType}
              onChange={handleconfirmPasswordChange}
              state={confirmPasswordError !== "" ? "error" : ""}
              errorMessage={confirmPasswordError !== "" ? confirmPasswordError : ""}
              maxLength={12}
            />
            <button className="icon" type="button" onClick={toggleConfirmPassword}>{confirmpasswordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
          </div>
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
            </div>
          </div>
          <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" onClick={(e) => handleSubmit(e)} type="submit">
            {btnDisabled ?
              <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
              : <span>Update password</span>}
          </button>
          <div className="mt-4">
            {error && error !== '' && <>
              <p className="mb-9 ml-1 text-base text-red-500">{error}</p>
            </>}
          </div>
          <div className="mt-4">
            {isSuccessfull && isSuccessfull !== '' && <>
              <p className="mb-9 ml-1 text-base text-green-500">{isSuccessfull}</p>
            </>}
          </div>
        </div>
      </div>
    </form>
  );
}
