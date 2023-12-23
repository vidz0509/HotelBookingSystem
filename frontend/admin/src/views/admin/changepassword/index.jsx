import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import { authServices } from "../../../services/auth";
import { validation } from "../../../services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";

export default function ChangePassword() {
  const [password, setpassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [passwordError, setpasswordError] = useState('');
  const [newPasswordError, setnewPasswordError] = useState('');
  const [confirmPasswordError, setconfirmPasswordError] = useState('');

  const [error, setError] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handlepasswordChange = (event) => {
    const value = event.target.value;
    setpassword(value);
  }

  const handlenewPasswordChange = (event) => {
    const value = event.target.value;
    setnewPassword(value);
  }

  const handleconfirmPasswordChange = (event) => {
    const value = event.target.value;
    setconfirmPassword(value);
  }

  useEffect(() => {

  }, []);

  const handleSubmit = async (event) => {
    // event.prevntDefault();
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
    if (newPassword === confirmPassword) {
      setError("Newpassword and Confirm password can not be same");
      return false;
    }
    setBtnDisabled(true);
    const requestBody = {
      password: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };
    const currentUser = authServices.getCurrentUser();
    const result = await authServices.changepassword(currentUser._id, requestBody);
    if (result.isSuccessful) {
      localStorage.setItem('currentUser', JSON.stringify(result.data));
      window.location.reload();
    } else {
      setError(result.errorMessage);
      setBtnDisabled(false);
    }


  }

  return (
    <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">

        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label=" password"
          placeholder="Enter Current Password*"
          id="password"
          type="password"
          onChange={handlepasswordChange}
          state={passwordError !== "" ? "error" : ""}
          errorMessage={passwordError !== "" ? passwordError : ""}
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="new Password*"
          placeholder="Enter New Password"
          id="newPassword"
          type="password"
          onChange={handlenewPasswordChange}
          state={newPasswordError !== "" ? "error" : ""}
          errorMessage={newPasswordError !== "" ? newPasswordError : ""}
        />
        <InputField
          variant="auth"
          extra="mb-3"
          label="confirm Password*"
          placeholder="Re-Enter New Password"
          id="confirmPassword"
          type="password"
          onChange={handleconfirmPasswordChange}
          state={confirmPasswordError !== "" ? "error" : ""}
          errorMessage={confirmPasswordError !== "" ? confirmPasswordError : ""}
        />
        {/* Checkbox */}
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
            : <span>update password</span>}
        </button>
        <div className="mt-4">
          {error !== '' && <>
            <p className="mb-9 ml-1 text-base text-red-500">{error}</p>
          </>}
        </div>


      </div>
    </div>
  );
}
