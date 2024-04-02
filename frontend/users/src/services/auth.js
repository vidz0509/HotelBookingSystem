import axios from 'axios';

export const authServices = {
    checkIfUserLoggedIn,
    login,
    register,
    getCurrentUser,
    updateProfile,
    uploadUserProfile,
    changepassword,
    forgotPassword,
    verifyResetPasswordCode,
    resetPassword,
    logout,
    getintouch
};

function checkIfUserLoggedIn() {
    return localStorage.getItem('currentUser') ? true : false;
}

async function login(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/auth/login?isCustomer=true`;
    console.log(requestBody)
    console.log(url)
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        console.error(errorObj);
        return errorObj;
    });
}
async function register(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/auth/register`;
    console.log(requestBody)
    console.log(url)
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        console.error(errorObj);
        return errorObj;
    });
}


async function updateProfile(userId, requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/users/${userId}`;
    return await axios.put(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        console.error(errorObj);
        return errorObj;
    });
}

async function uploadUserProfile(formData) {
    const userData = authServices.getCurrentUser();
    return await axios.post(`${process.env.REACT_APP_API_URL}/users/upload/${userData._id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

async function changepassword(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/auth/changePassword`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        console.error(errorObj);
        return errorObj;
    });
}

async function forgotPassword(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/auth/forgotPassword?isCustomer=true`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}
async function getintouch(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/auth/getInTouch`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function verifyResetPasswordCode(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/auth/verifyResetPasswordCode`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        console.error(errorObj);
        return errorObj;
    });
}

async function resetPassword(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/auth/resetPassword`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        console.error(errorObj);
        return errorObj;
    });
}

function getCurrentUser() {
    if (checkIfUserLoggedIn()) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser;
    } else {
        return false;
    }
}

async function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}