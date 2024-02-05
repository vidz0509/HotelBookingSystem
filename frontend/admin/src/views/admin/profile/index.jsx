import React, { useState } from "react";
import InputField from "components/fields/InputField";
import { authServices } from "../../../services/auth";
import { validation } from "../../../services/validations";
import btnLoader from "../../../assets/img/layout/btn-loader.gif";
import Swal from "sweetalert2";

export default function ProfileOverview() {
  const userData = authServices.getCurrentUser();
  const [email, setEmail] = useState(userData.email ? userData.email : '');
  const [fullname, setFullname] = useState(userData.fullname ? userData.fullname : '');
  const [contact, setContact] = useState(userData.phone ? userData.phone : '');
  const [image, setimage] = useState('');

  const [emailError, setEmailError] = useState('');
  const [fullnameError, setFullNameError] = useState('');
  const [contactError, setContactError] = useState('');
  const [imageError, setimageError] = useState('');


  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    setFullname(value);
  }

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  }

  const handleContactChange = (event) => {
    const value = event.target.value;
    setContact(value);
  }

  const handleimageChange = async(event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const value = event.target.value;
    setimage(value);
    const test = await authServices.uploadProfile(formData);
    console.log(test);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError('');
    setFullNameError('');
    setContactError('');
    setimageError('');
    setError('');
    setSuccessful('');
    if (validation.isEmpty(fullname)) {
      setFullNameError("Please enter valid fullname.");
      return false;
    }
    if (validation.isEmpty(email) || !validation.isValidEmail(email)) {
      setEmailError("Please enter valid email address.");
      return false;
    }
    if (validation.isEmpty(contact)) {
      setContactError("Please enter valid phone no.");
      return false;
    }
    // if (validation.isEmpty(image)) {
    //   setimageError("Please enter valid image.");
    //   return false;
    // }
    setBtnDisabled(true);
    const requestBody = {
      fullname: fullname,
      email: email,
      phone: contact,
      image: image
    };
    const currentUser = authServices.getCurrentUser();
    const result = await authServices.updateProfile(currentUser._id, requestBody);
    if (result.isSuccessful) {
      Swal.fire({
        title: "Updated",
        text: "Profile has been updated successfully.",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          setBtnDisabled(false);
          window.location.href = '/admin/profile';
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
      <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <InputField
          variant="auth"
          extra="mb-3"
          label="Fullname*"
          placeholder="Fullname*"
          id="fullname"
          type="text"
          onChange={handleFullNameChange}
          state={fullnameError !== "" ? "error" : ""}
          errorMessage={fullnameError !== "" ? fullnameError : ""}
          value={fullname}
          maxLength={30}
        />
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
          onChange={handleEmailChange}
          state={emailError !== "" ? "error" : ""}
          errorMessage={emailError !== "" ? emailError : ""}
          value={email}
          maxLength={40}
        />
        <InputField
          variant="auth"
          extra="mb-3"
          label="Phone no"
          placeholder="Phone no"
          id="contact"
          type="text"
          onChange={handleContactChange}
          state={contactError !== "" ? "error" : ""}
          errorMessage={contactError !== "" ? contactError : ""}
          value={contact}
          maxLength={10}
        />
        <input type="file"
          variant="auth"
          extra="mb-3"
          label="Profile img"
          placeholder="Profile img"
          id="image"
          onChange={handleimageChange}
          state={imageError !== "" ? "error" : ""}
          errorMessage={imageError !== "" ? imageError : ""}
          value={image}
        />

        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
          </div>
          <button className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} onClick={(e) => handleSubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
            {btnDisabled ?
              <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px]" alt="loader" /></span>
              : <span>Save Profile</span>}
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