import React, { useState } from "react";
import { validation } from "services/validation";
import Swal from "sweetalert2";
import btnLoader from "../../../assets/images/button-loader/btn-loader.gif";

import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

import { authServices } from "services/auth";

export default function Profile() {
    const userData = authServices.getCurrentUser();
    const [email, setEmail] = useState(userData.email ? userData.email : '');
    const [fullname, setFullname] = useState(userData.fullname ? userData.fullname : '');
    const [phone, setContact] = useState(userData.phone ? userData.phone : '');
    const [profileImg, setProfileImage] = useState('');

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

    const handleProfileImageChange = async (event) => {
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
        if (validation.isEmpty(phone) || !validation.isValidPhoneNo(phone)) {
            setContactError("Please enter valid phone no.");
            return false;
        }


        setBtnDisabled(true);
        const requestBody = {
            fullname: fullname,
            email: email,
            phone: phone
        };

        const currentUser = authServices.getCurrentUser();
        const result = await authServices.updateProfile(currentUser._id, requestBody);
        if (result.isSuccessful) {
            if (profileImg !== '' && profileImg != null) {
                const formData = new FormData();
                formData.append("file", profileImg);
                const imageResponse = await authServices.uploadUserProfile(formData);
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
                        window.location.reload();
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
        <>
            <MKBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
            >
                <MKBox>
                    <MKBox width="100%" component="form" method="post" autoComplete="off">
                        <MKTypography variant="h4" color="text" mb={4}>
                            My Profile
                        </MKTypography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <MKInput
                                    variant="standard"
                                    label="Full Name*"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    onChange={handleFullNameChange}
                                    state={fullnameError !== "" ? "error" : ""}
                                    errorMessage={fullnameError !== "" ? fullnameError : ""}
                                    value={fullname}
                                    maxLength={30} />

                            </Grid>
                            <Grid item xs={12}>
                                <MKInput
                                    type="email"
                                    variant="standard"
                                    label="Email*"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    onChange={handleEmailChange}
                                    state={emailError !== "" ? "error" : ""}
                                    value={email}
                                    errorMessage={emailError !== "" ? emailError : ""} />
                            </Grid>
                            <Grid item xs={12}>
                                <MKInput
                                    type="text"
                                    variant="standard"
                                    label="Phone no"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    onChange={handleContactChange}
                                    state={contactError !== "" ? "error" : ""}
                                    value={phone}
                                    errorMessage={contactError !== "" ? contactError : ""} />
                            </Grid>
                            <Grid item xs={12}>
                                {userData?.profileImg && userData?.profileImg !== '' &&
                                    <Grid className="mb-3 w-2/4">
                                        <img src={userData?.profileImg} className="customImage" alt={fullname} />
                                    </Grid>
                                }
                                <MKInput
                                    type="file"
                                    variant="standard"
                                    extra="mb-3"
                                    label="Profile img"
                                    placeholder="Profile img"
                                    id="image"
                                    onChange={handleProfileImageChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} mt={5} mb={2}>
                            <MKButton variant="gradient" color="info" onClick={(e) => handleSubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
                                {btnDisabled ?
                                    <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px] btn-loader" alt="loader" /></span>
                                    : <span>Save Profile</span>}
                            </MKButton>
                            <MKBox className="mt-4">
                                {error !== '' && <>
                                    <p className="mb-9 ml-1 text-base text-red-500">{error}</p>
                                </>}
                            </MKBox>
                            <MKBox className="mt-4">
                                {successful !== '' && <>
                                    <p className="mb-9 ml-1 text-base text-green-500">{successful}</p>
                                </>}
                            </MKBox>
                        </Grid>
                    </MKBox>
                </MKBox>
            </MKBox>
        </>
    );
}