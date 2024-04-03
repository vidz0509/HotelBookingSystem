import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import SimpleFooter from "examples/Footers/SimpleFooter";
import { authServices } from "services/auth";
import { validation } from "services/validation";
import { useState, useEffect } from "react";
import bgImage from "assets/images/auth.jpg";
import {
    MdRemoveRedEye,
    MdOutlineRemoveRedEye,
} from "react-icons/md";
import Swal from "sweetalert2";

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
        setError('');
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
        setBtnDisabled(true);
        const currentUser = authServices.getCurrentUser();
        const requestBody = {
            email: currentUser.email,
            password: password,
            newpassword: newPassword,
        };
        setSuccessfull("Password change successfully");
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
                    }
                });
        }
    }
    const clearErrors = () => {
        setconfirmPasswordError('');
        setnewPasswordError('');
        setpasswordError('');
        setError('');
        setSuccessfull('');
    }
    return (
        <>
            <MKBox display="flex" flexDirection="column" justifyContent="center">
                <MKBox>
                    <MKBox width="100%" component="form" method="post" autoComplete="off" onSubmit={handleSubmit}>
                        <MKTypography variant="h4" color="text" mb={4}>
                            Change Password
                        </MKTypography>
                        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
                            <Grid item container>
                                <Grid item xs={12}>
                                    <MKBox mb={2}>
                                        <div className={`field${passwordError !== "" ? " has-error" : ""}`}>
                                            <MKInput type={passwordType} InputLabelProps={{ shrink: true }} label="Current Password*" fullWidth
                                                variant="standard"
                                                onChange={handlepasswordChange}
                                                state={passwordError !== "" ? "error" : ""}
                                                errorMessage={passwordError !== "" ? passwordError : ""}
                                                maxLength={12}
                                            />
                                            <button className="icon" type="button" onClick={(e) => togglePassword(e)}>{passwordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
                                        </div>
                                    </MKBox>
                                    <MKBox mb={2}>
                                        <div className={`field${newPasswordError !== "" ? " has-error" : ""}`}>
                                            <MKInput type={newpasswordType} label="New Password*" fullWidth
                                                onChange={handlenewPasswordChange}
                                                state={newPasswordError !== "" ? "error" : ""}
                                                errorMessage={newPasswordError !== "" ? newPasswordError : ""}
                                                maxLength={12}
                                                InputLabelProps={{ shrink: true }}
                                                variant="standard"
                                            />
                                            <button className="icon" type="button" onClick={(e) => toggleNewPassword(e)}>{newpasswordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
                                        </div>
                                    </MKBox>
                                    <MKBox mb={2}>
                                        <div className={`field${confirmPasswordError !== "" ? " has-error" : ""}`}>
                                            <MKInput type={confirmpasswordType} label="Re-enter Password*" fullWidth
                                                onChange={handleconfirmPasswordChange}
                                                state={confirmPasswordError !== "" ? "error" : ""}
                                                errorMessage={confirmPasswordError !== "" ? confirmPasswordError : ""}
                                                maxLength={12}
                                                InputLabelProps={{ shrink: true }}
                                                variant="standard"
                                            />
                                            <button className="icon" type="button" onClick={(e) => toggleConfirmPassword(e)}>{confirmpasswordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
                                        </div>
                                    </MKBox>
                                    <MKBox mt={4}>
                                        <MKButton variant="gradient" color="info" onclick={(e) => handleSubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
                                            Change Password
                                        </MKButton>
                                        <MKButton className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} >
                                        </MKButton>
                                    </MKBox>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MKBox>
                </MKBox>
            </MKBox>
        </>
    );
}