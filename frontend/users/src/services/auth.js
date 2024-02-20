import axios from 'axios';

export const authServices = {
    checkIfUserLoggedIn,
    login,
    register,
    getCurrentUser,
    updateProfile,
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
    // const url = `http://localhost:5001/auth/login`;
    const url = `http://localhost:5001/auth/login?isCustomer=true`;
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
    // const url = `http://localhost:5001/auth/login`;
    const url = `http://localhost:5001/auth/register`;
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
    const url = `http://localhost:5001/users/${userId}`;
    return await axios.put(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        console.error(errorObj);
        return errorObj;
    });
}

async function changepassword(requestBody) {
    const url = `http://localhost:5001/auth/changePassword`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        console.error(errorObj);
        return errorObj;
    });
}

async function forgotPassword(requestBody) {
    const url = `http://localhost:5001/auth/forgotPassword`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        // console.error(errorObj);
        return errorObj;
    });
}
async function getintouch(requestBody) {
    const url = `http://localhost:5001/auth/getintouch`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        // console.error(errorObj);
        return errorObj;
    });
}

async function verifyResetPasswordCode(requestBody) {
    const url = `http://localhost:5001/auth/verifyResetPasswordCode`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        console.error(errorObj);
        return errorObj;
    });
}

async function resetPassword(requestBody) {
    const url = `http://localhost:5001/auth/resetPassword`;
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