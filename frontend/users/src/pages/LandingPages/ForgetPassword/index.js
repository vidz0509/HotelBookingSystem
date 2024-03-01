import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import SimpleFooter from "examples/Footers/SimpleFooter";
import { authServices } from "services/auth";
import { validation } from "services/validation";
import { useState } from "react";
import btnLoader from "assets/images/button-loader/btn-loader.gif";
import bgImage from "assets/images/auth.jpg";
import { Link } from "react-router-dom";
import {
    MdRemoveRedEye,
    MdOutlineRemoveRedEye,
} from "react-icons/md";
import Swal from "sweetalert2";

function ForgetPasswordBasic() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [screen, setScreen] = useState('forgotPassword');

    // const [newpasswordType, setNewPasswordType] = useState("password");
    // const [confirmpasswordType, setConfirmPasswordType] = useState("password");

    const [verificationCode, setVerificationCode] = useState('');
    const [codeError, setCodeError] = useState('');
    const [vbtnDisabled, setVBtnDisabled] = useState(false);
    const [vbtnLoading, setVBtnLoading] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [confPasswordError, setConfPasswordError] = useState('');

    const [passwordType, setPasswordType] = useState("password");
    const [confirmpasswordType, setConfirmPasswordType] = useState("password");

    const togglePassword = (e) => {
        e.preventDefault();
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const toggleConfirmPassword = (e) => {
        e.preventDefault();
        if (confirmpasswordType === "password") {
            setConfirmPasswordType("text")
            return;
        }
        setConfirmPasswordType("password")
    }


    const handleEmailChange = (event) => {
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
                    setScreen("verifycode");
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

    /* Verify Code */

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

    /* Reset Password */

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
                    window.location.href = '/SignIn';
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
                <>
                    <MKBox
                        position="absolute"
                        top={0}
                        left={0}
                        zIndex={1}
                        width="100%"
                        minHeight="100vh"
                        sx={{
                            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                                `${linearGradient(
                                    rgba(gradients.dark.main, 0.6),
                                    rgba(gradients.dark.state, 0.6)
                                )}, url(${bgImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                    <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
                        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
                            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
                                <Card>
                                    <MKBox
                                        variant="gradient"
                                        bgColor="info"
                                        borderRadius="lg"
                                        coloredShadow="info"
                                        mx={2}
                                        mt={-3}
                                        p={2}
                                        mb={1}
                                        textAlign="center"
                                    >
                                        <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                            Forget Password
                                        </MKTypography>
                                    </MKBox>
                                    <MKBox pt={4} pb={3} px={3}>
                                        {/* <MKBox component="form" role="form"> */}
                                        <form method="post" onSubmit={sendVerificationCode}>
                                            <MKBox mb={2}
                                                color="dark">
                                                <MKInput type="email" label="Email" fullWidth
                                                    onChange={handleEmailChange}
                                                    state={emailError !== "" ? "error" : ""}
                                                    errorMessage={emailError !== "" ? emailError : ""} />
                                            </MKBox>
                                            <MKTypography component={Link} to="/SignIn" variant="button" color="info" fontWeight="medium" textGradient>
                                                Back to SignIn
                                            </MKTypography>
                                            <MKBox mt={4} mb={1}>
                                                <MKButton className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} variant="gradient" color="info" fullWidth onclick={(e) => sendVerificationCode(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
                                                    {btnDisabled ?
                                                        <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px] btn-loader" alt="loader" /></span>
                                                        : <span>Send</span>}
                                                </MKButton>
                                                <MKBox className="mt-4">
                                                    {error !== '' && <>
                                                        <p className="mb-9 ml-1 text-base text-red-500">{error}</p>
                                                    </>}
                                                </MKBox>
                                            </MKBox>
                                        </form>
                                        {/* </MKBox> */}
                                    </MKBox>
                                </Card>
                            </Grid>
                        </Grid>
                    </MKBox>
                    <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
                        <SimpleFooter light />
                    </MKBox>
                </>
            }
            {
                screen === "verifycode" &&
                <>
                    <MKBox
                        position="absolute"
                        top={0}
                        left={0}
                        zIndex={1}
                        width="100%"
                        minHeight="100vh"
                        sx={{
                            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                                `${linearGradient(
                                    rgba(gradients.dark.main, 0.6),
                                    rgba(gradients.dark.state, 0.6)
                                )}, url(${bgImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                    <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
                        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
                            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
                                <Card>
                                    <MKBox
                                        variant="gradient"
                                        bgColor="info"
                                        borderRadius="lg"
                                        coloredShadow="info"
                                        mx={2}
                                        mt={-3}
                                        p={2}
                                        mb={1}
                                        textAlign="center"
                                    >
                                        <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                            Verificaton Code
                                        </MKTypography>
                                    </MKBox>
                                    <MKBox pt={4} pb={3} px={3}>
                                        {/* <MKBox component="form" role="form"> */}
                                        <form method="post" onSubmit={verifyCode}>
                                            <MKBox mb={2}
                                                color="dark">
                                                <MKInput type="string" label="Code" fullWidth
                                                    onChange={handleCodeChange}
                                                    state={codeError !== "" ? "error" : ""}
                                                    errorMessage={codeError !== "" ? codeError : ""} />
                                            </MKBox>
                                            <MKTypography component={Link} to="/SignIn" variant="button" color="info" fontWeight="medium" textGradient>
                                                <a className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white" href="#" onClick={sendVerificationCode}>Didn&apos;t recieve code? Resend.</a>
                                            </MKTypography>
                                            <MKBox mt={4} mb={1}>
                                                <MKButton className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${vbtnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} variant="gradient" color="info" fullWidth onclick={(e) => verifyCode(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
                                                    {vbtnLoading ?
                                                        <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px] btn-loader" alt="loader" /></span>
                                                        : <span>Verify</span>}
                                                </MKButton>
                                                <MKBox className="mt-4">
                                                    {error !== '' && <>
                                                        <p className="mb-9 ml-1 text-base text-red-500">{error}</p>
                                                    </>}
                                                </MKBox>
                                            </MKBox>
                                        </form>
                                        {/* </MKBox> */}
                                    </MKBox>
                                </Card>
                            </Grid>
                        </Grid>
                    </MKBox>
                    <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
                        <SimpleFooter light />
                    </MKBox>
                </>
            }
            {
                screen === "resetPwd" &&
                <>
                    <MKBox
                        position="absolute"
                        top={0}
                        left={0}
                        zIndex={1}
                        width="100%"
                        minHeight="100vh"
                        sx={{
                            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                                `${linearGradient(
                                    rgba(gradients.dark.main, 0.6),
                                    rgba(gradients.dark.state, 0.6)
                                )}, url(${bgImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                    <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
                        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
                            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
                                <Card>
                                    <MKBox
                                        variant="gradient"
                                        bgColor="info"
                                        borderRadius="lg"
                                        coloredShadow="info"
                                        mx={2}
                                        mt={-3}
                                        p={2}
                                        mb={1}
                                        textAlign="center"
                                    >
                                        <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                            Reset Password
                                        </MKTypography>
                                    </MKBox>
                                    <MKBox pt={4} pb={3} px={3}>
                                        {/* <MKBox component="form" role="form"> */}
                                        <form method="post" onSubmit={resetPassword}>
                                            <MKBox mb={2}
                                                color="dark">
                                                <div className={`field${passwordError !== "" ? " has-error" : ""}`}>
                                                    <MKInput type={passwordType} label="New Password" fullWidth
                                                        onChange={handlePasswordChange}
                                                        state={passwordError !== "" ? "error" : ""}
                                                        errorMessage={passwordError !== "" ? passwordError : ""} />
                                                    <button className="icon" type="button" onClick={(e) => togglePassword(e)}>{passwordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
                                                </div>
                                            </MKBox>
                                            <MKBox mb={2}
                                                color="dark">
                                                <div className={`field${confPasswordError !== "" ? " has-error" : ""}`}>
                                                    <MKInput type={confirmpasswordType} label="Confirm Password" fullWidth
                                                        onChange={handleConfPasswordChange}
                                                        state={confPasswordError !== "" ? "error" : ""}
                                                        errorMessage={confPasswordError !== "" ? confPasswordError : ""} />
                                                    <button className="icon" type="button" onClick={(e) => toggleConfirmPassword(e)}>{confirmpasswordType === "password" ? <MdRemoveRedEye className="h-5 w-5" /> : <MdOutlineRemoveRedEye className="h-5 w-5" />}</button>
                                                </div>
                                            </MKBox>
                                            <MKTypography component={Link} to="/SignIn" variant="button" color="info" fontWeight="medium" textGradient>
                                                Back to SignIn
                                            </MKTypography>
                                            <MKBox mt={2} mb={1}>
                                                <MKButton className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} variant="gradient" color="info" fullWidth onclick={(e) => resetPassword(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
                                                    {btnDisabled ?
                                                        <span className="flex items-center justify-center"><img src={btnLoader} className="xl:max-w-[25px] btn-loader" alt="loader" /></span>
                                                        : <span>Reset Password</span>}
                                                </MKButton>
                                                <MKBox className="mt-4">
                                                    {error !== '' && <>
                                                        <p className="mb-9 ml-1 text-base text-red-500">{error}</p>
                                                    </>}
                                                </MKBox>
                                            </MKBox>
                                        </form>
                                        {/* </MKBox> */}
                                    </MKBox>
                                </Card>
                            </Grid>
                        </Grid>
                    </MKBox>
                    <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
                        <SimpleFooter light />
                    </MKBox>
                </>
            }
        </>
    );
}

export default ForgetPasswordBasic;
