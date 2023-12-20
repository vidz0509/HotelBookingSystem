import InputField from "../../components/fields/InputField";
import { authServices } from "../../services/auth";
import { validation } from "../../services/validations";
import { useState } from "react";
import btnLoader from "../../assets/img/layout/btn-loader.gif";
// import { FcGoogle } from "react-icons/fc";
// import Checkbox from "components/checkbox";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleEmailChange = (event) => {    
    const value = event.target.value;
    setEmail(value);
  }
  
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');
    if (validation.isEmpty(email) || !validation.isValidEmail(email)) {
      setEmailError("Please enter valid email address.");
      return false;
    }
    if (validation.isEmpty(password)) {
      setPasswordError("Please enter valid Password.");
      return false;
    }
    setBtnDisabled(true);
    const requestBody = {
      email: email,
      password: password
    };
    const result = await authServices.login(requestBody);
    if (result.isSuccessful) {
      localStorage.setItem('currentUser', JSON.stringify(result.data));
      window.location.reload();
    } else {
      setError(result.errorMessage);
      setBtnDisabled(false);
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
        {/* Sign in section */}
        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Sign In
          </h4>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Enter your email and password to sign in!
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
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            onChange={handlePasswordChange}
            state={passwordError !== "" ? "error" : ""}
            errorMessage={passwordError !== "" ? passwordError : ""}
            maxLength={12}
          />
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
            </div>
            <a className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white" href="/auth/forgot-password">Forgot Password?</a>
          </div>
          <button className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} onClick={handleSubmit} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
            {btnDisabled ?
              <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
              : <span>log In</span>}
          </button>
          <div className="mt-4">
            {error !== '' && <>
              <p className="mb-9 ml-1 text-base text-red-500">{error}</p>
            </>}
          </div>
        </div>
      </div>
    </form>
  );
}
