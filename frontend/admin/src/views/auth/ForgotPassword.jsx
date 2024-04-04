import InputField from "../../components/fields/InputField";
import { authServices } from "../../services/auth";
import { validation } from "../../services/validations";
import { useState } from "react";
import btnLoader from "../../assets/img/layout/btn-loader.gif";
import {
  MdRemoveRedEye,
  MdOutlineRemoveRedEye,
} from "react-icons/md";

import Swal from "sweetalert2";

export default function ForgotPassword() {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [screen, setScreen] = useState('forgotPassword');

  const [newpasswordType, setNewPasswordType] = useState("password");
  const [confirmpasswordType, setConfirmPasswordType] = useState("password");

  const [verificationCode, setVerificationCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [vbtnDisabled, setVBtnDisabled] = useState(false);
  const [vbtnLoading, setVBtnLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [confPasswordError, setConfPasswordError] = useState('');

  /* Forget Password */

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

  const handleEmailChange = (event) => {
    clearErrors();
    const value = event.target.value;
    setEmail(value);
  }

  const sendVerificationCode = async (event) => {
    event.preventDefault();
    if (validation.isEmpty(email) || !validation.isValidEmail(email)) {
      setEmailError("Please enter valid email address.");
      return false;
    }
    clearErrors();
    setBtnDisabled(true);
    setVBtnDisabled(true);
    const requestBody = {
      email: email
    };
    const result = await authServices.forgotPassword(requestBody);
    if (result.isSuccessful) {
      Swal.fire({
        title: "Success",
        text: "Verify Code sent successfully.",
        icon: "success",
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          setBtnDisabled(false);
          setVBtnDisabled(false);
          setScreen("verifyCode");
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
            setVBtnDisabled(false);
            window.location.reload();
          }
        });
    }
  }


  const handleCodeChange = (event) => {
    clearErrors();
    const value = event.target.value;
    setVerificationCode(value);
  }

  const verifyCode = async (event) => {
    event.preventDefault();
    if (validation.isEmpty(verificationCode)) {
      setCodeError("Invalid verification code.");
      return false;
    }
    clearErrors();
    setVBtnDisabled(true);
    setVBtnLoading(true);
    const requestBody = {
      email: email,
      code: verificationCode
    };
    const result = await authServices.verifyResetPasswordCode(requestBody);
    if (result.isSuccessful) {
      Swal.fire({
        title: "Success",
        text: "Code verified successfully.",
        icon: "success",
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          setVBtnDisabled(false);
          setVBtnLoading(false);
          setScreen("resetPwd");
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
            setVBtnDisabled(false);
            setVBtnLoading(false);
            window.location.reload();
          }
        });
    }
  }

  const handlePasswordChange = (event) => {
    clearErrors();
    const value = event.target.value;
    setPassword(value);
  }

  const handleConfPasswordChange = (event) => {
    clearErrors();
    const value = event.target.value;
    setConfPassword(value);
  }

  const resetPassword = async (event) => {
    event.preventDefault();
    if (validation.isEmpty(password)) {
      setPasswordError("Please enter your new password.");
      return false;
    }
    if (validation.isEmpty(confPassword)) {
      setConfPasswordError("Please enter confirm password.");
      return false;
    }

    if (password !== confPassword) {
      setError("New Password and Confirm Password must be same.");
      return false;
    }

    if (confPassword.length < 8) {
      setError("Password must be 8 characters long.");
      return false;
    }

    if (!validation.isValidPassword(confPassword)) {
      setError("Password must have at least one digit, one special chacter and one uppercase letter");
      return false;
    }
    clearErrors();
    setBtnDisabled(true);
    const requestBody = {
      email: email,
      password: password
    };
    const result = await authServices.resetPassword(requestBody);
    if (result.isSuccessful) {
      Swal.fire({
        title: "Success",
        text: "Password changed successfully.",
        icon: "success",
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/auth/login';
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
    setEmailError('');
    setConfPasswordError('');
    setPasswordError('');
    setError('');
    setCodeError('');
  }

  return (
    <>
      {
        screen === "forgotPassword" &&
        <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
            <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Forgot Your Password?
            </h4>
            <p className="mb-9 ml-1 text-base text-gray-600">
              Don't Worry. Reset your password here!
            </p>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="email"
              onChange={handleEmailChange}
              state={emailError !== "" ? "error" : ""}
              errorMessage={emailError !== "" ? emailError : ""}
            />
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="flex items-center">
              </div>
              <a className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white" href="/auth/login">Back to Login</a>
            </div>
            <button className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} onClick={sendVerificationCode} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
              {btnDisabled ?
                <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
                : <span>Send</span>}
            </button>
            <div className="mt-4">
              {error !== '' && <>
                <p className="mb-9 ml-1 text-base text-red-500">{error}</p>
              </>}
            </div>
          </div>
        </div>
      }
      {
        screen === "verifyCode" &&
        <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
            <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Forgot Your Password?
            </h4>
            <p className="mb-9 ml-1 text-base text-gray-600">
              Enter your verification code here!
            </p>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Verification Code*"
              placeholder="****"
              id="verificationCode"
              type="text"
              onChange={handleCodeChange}
              state={codeError !== "" ? "error" : ""}
              errorMessage={codeError !== "" ? codeError : ""}
              maxLength={4}
            />
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="flex items-center">
              </div>
              <a className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white" href="#" onClick={sendVerificationCode}>Didn't recieve code? Resend.</a>
            </div>
            <button className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${vbtnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} onClick={verifyCode} type="submit" disabled={vbtnDisabled ? 'disabled' : ''}>
              {vbtnLoading ?
                <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
                : <span>Verify</span>}
            </button>
          </div>
        </div>
      }
      {
        screen === "resetPwd" &&
        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Reset Password
          </h4>
          <p className="mb-9 ml-1 text-base text-gray-600">Enter your new password here!</p>
          <div className={`field${passwordError !== "" ? " has-error" : ""}`}>
            <InputField
              variant="auth"
              extra="mb-3"
              label="New Password*"
              placeholder="********"
              id="new_password"
              type={newpasswordType}
              onChange={handlePasswordChange}
              state={passwordError !== "" ? "error" : ""}
              errorMessage={passwordError !== "" ? passwordError : ""}
              maxLength={12}
            />
            <button className="icon" type="button" onClick={toggleNewPassword}>{newpasswordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
          </div>
          <div className={`field${confPasswordError !== "" ? " has-error" : ""}`}>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Confirm Password*"
              placeholder="********"
              id="confirm_password"
              type={confirmpasswordType}
              onChange={handleConfPasswordChange}
              state={confPasswordError !== "" ? "error" : ""}
              errorMessage={confPasswordError !== "" ? confPasswordError : ""}
              maxLength={12}
            />
            <button className="icon" type="button" onClick={toggleConfirmPassword}>{confirmpasswordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
          </div>
          {error !== '' && <>
            <p className="mb-3 ml-1 text-red-500 text-sm">{error}</p>
          </>}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
            </div>
            <a className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white" href="/auth/login">Back to Login</a>
          </div>
          <button className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} onClick={resetPassword} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
            {btnDisabled ?
              <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
              : <span>Reset Password</span>}
          </button>
        </div>
      }
    </>
  );
}
