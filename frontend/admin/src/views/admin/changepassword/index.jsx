import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import { authServices } from "../../../services/auth";
import { validation } from "../../../services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";

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
  const [isSuccessfull, setSuccessfull] = useState('');

  const [error, setError] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const toggleNewPassword = () => {
    if (newpasswordType === "password") {
      setNewPasswordType("text")
      return;
    }
    setNewPasswordType("password")
  }

  const toggleConfirmPassword = () => {
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
    setBtnDisabled(true);
    const currentUser = authServices.getCurrentUser();
    const requestBody = {
      userId: currentUser._id,
      password: password,
      newpassword: newPassword,
    };
    setSuccessfull("Password change successfully");
    const result = await authServices.changepassword(requestBody);
    if (result.isSuccessfull) {
      setSuccessfull(result.isSuccessfullMessage);
      setBtnDisabled(false);
      setTimeout(function () {
        console.log("Password change successfully")
        window.location.reload();
      }, 1000);
    } else {
      setError(result.errorMessage);
      setBtnDisabled(false);
    }
  }
  const clearErrors = () => {
    setconfirmPasswordError('');
    setnewPasswordError('');
    setpasswordError('');
  }

  return (
    <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <div className="field">
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
          <button className="icon" onClick={togglePassword}>{passwordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
        </div>
        <div className="field">
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
          <button className="icon" onClick={toggleNewPassword}>{newpasswordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
        </div>
        <div className="field">
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
          <button className="icon" onClick={toggleConfirmPassword}>{confirmpasswordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
        </div>
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            {/* <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p> */}
          </div>
          {/* <a
                        className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                        href="/auth/forgot-password"
                    >
                        Forgot Password?
                    </a> */}
        </div>
        <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" onClick={(e) => handleSubmit(e)} type="submit">
          {btnDisabled ?
            <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
            : <span>Update password</span>}
        </button>
        <div className="mt-4">
          {error !== '' && <>
            <p className="mb-9 ml-1 text-base text-red-500">{error}</p>
          </>}
        </div>
        <div className="mt-4">
          {isSuccessfull !== '' && <>
            <p className="mb-9 ml-1 text-base text-red-500">{isSuccessfull}</p>
          </>}
        </div>
      </div>
    </div>
  );
}
