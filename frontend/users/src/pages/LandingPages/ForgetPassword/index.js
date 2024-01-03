// import { Link } from "react-router-dom";
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
import bgImage from "assets/images/auth.jpg";

function ForgetPasswordBasic() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false);


    const handleEmailChange = (event) => {
        const value = event.target.value;
        console.log(value)
        setEmail(value);
    }

    const handlesubmit = async (event) => {
        event.preventDefault();
        console.log(event)
        setEmailError('');
        if (validation.isEmpty(email) || !validation.isValidEmail(email)) {
            setEmailError("Please enter valid email address.");
            return false;
        }
        setBtnDisabled(true);
        const requestBody = {
            email: email,
        };
        const result = await authServices.login(requestBody);
        if (result.isSuccessful) {
            localStorage.setItem('currentUser', JSON.stringify(result.data));
            window.location.replace('/');
        } else {
            setError(result.errorMessage);
            setBtnDisabled(false);

        }
    }
    return (
        <>
            {
                screen === "forgotPassword" &&
                <form method="post" onSubmit={sendVerificationCode}>
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
                                        <form method="post" onSubmit={handlesubmit}>
                                            <MKBox mb={2}
                                                color="dark">
                                                <MKInput type="email" label="Email" fullWidth
                                                    onChange={handleEmailChange}
                                                    state={emailError !== "" ? "error" : ""}
                                                    errorMessage={emailError !== "" ? emailError : ""} />
                                            </MKBox>
                                            <MKBox mt={4} mb={1}>
                                                <MKButton variant="gradient" color="info" fullWidth onclick={(e) => handlesubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
                                                    Send
                                                </MKButton>
                                                <MKButton className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} >
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
                </form>
            }
            {
                screen === "verifycode" &&
                <form method="post" onSubmit={VerifyCode}>
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
                                        <form method="post" onSubmit={handlesubmit}>
                                            <MKBox mb={2}
                                                color="dark">
                                                <MKInput type="email" label="Email" fullWidth
                                                    onChange={handleEmailChange}
                                                    state={emailError !== "" ? "error" : ""}
                                                    errorMessage={emailError !== "" ? emailError : ""} />
                                            </MKBox>
                                            <MKBox mt={4} mb={1}>
                                                <MKButton variant="gradient" color="info" fullWidth onclick={(e) => handlesubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
                                                    Send
                                                </MKButton>
                                                <MKButton className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} >
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
                </form>
            }
            {
                screen === "resetpwd" &&
                <form method="post" onSubmit={ResetPassword}>
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
                                        <form method="post" onSubmit={handlesubmit}>
                                            <MKBox mb={2}
                                                color="dark">
                                                <MKInput type="email" label="Email" fullWidth
                                                    onChange={handleEmailChange}
                                                    state={emailError !== "" ? "error" : ""}
                                                    errorMessage={emailError !== "" ? emailError : ""} />
                                            </MKBox>
                                            <MKBox mt={4} mb={1}>
                                                <MKButton variant="gradient" color="info" fullWidth onclick={(e) => handlesubmit(e)} type="submit" disabled={btnDisabled ? 'disabled' : ''}>
                                                    Reset Password
                                                </MKButton>
                                                <MKButton className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? 'opacity-80 py-[10px]' : 'py-[12px]'}`} >
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
                </form>
            }
        </>
    );
}

export default ForgetPasswordBasic;
