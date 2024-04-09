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
  const [profileImage, setProfileImage] = useState('');

  const [emailError, setEmailError] = useState('');
  const [fullnameError, setFullNameError] = useState('');
  const [contactError, setContactError] = useState('');

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

  const handleimageChange = async (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  }

  const handleSubmit = async (event) => {
    let isValid = false;
    event.preventDefault();
    setEmailError('');
    setFullNameError('');
    setContactError('');
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
    if (validation.isEmpty(contact) || !validation.isValidPhoneNo(contact)) {
      setContactError("Please enter valid phone no.");
      return false;
    }
    setBtnDisabled(false);
    const currentUser = authServices.getCurrentUser();
    const requestBody = {
      fullname: fullname,
      email: email,
      phone: contact,
    };
    const result = await authServices.updateProfile(currentUser._id, requestBody);
    if (result.isSuccessful) {
      if (profileImage !== '' && profileImage != null) {
        const formData = new FormData();
        formData.append("file", profileImage);
        const imageResponse = await authServices.uploadProfile(formData);
        if (imageResponse.isSuccessful) {
          localStorage.setItem('currentUser', JSON.stringify(imageResponse.data));
          isValid = true;
        } else {
          isValid = false;
        }
      } else {
        isValid = true;
        localStorage.setItem('currentUser', JSON.stringify(result.data));
      }
      if (isValid) {
        Swal.fire({
          title: "Updated",
          text: "Profile has been updated successfully.",
          icon: "success",
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            setBtnDisabled(false);
            window.location.href = '/admin/profile';
          }
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: 'Something went wrong.',
          icon: "error",
          allowOutsideClick: false
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: result.errorMessage,
        icon: "error",
        allowOutsideClick: false
      });
    }
  }

  return (
    <form>
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
          {userData.profileImg && userData.profileImg !== '' &&
            <div className="mb-3">
              <img src={userData.profileImg} alt={userData.fullname} />
            </div>
          }
          <input type="file"
            variant="auth"
            extra="mb-3"
            label="Profile img"
            placeholder="Profile img"
            id="image"
            onChange={handleimageChange}
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
    </form>
  );
}