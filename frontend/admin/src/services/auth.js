import axios from 'axios';

export const authServices = {
    checkIfUserLoggedIn,
    login,
    getCurrentUser,
  
};

function checkIfUserLoggedIn() {
    return localStorage.getItem('currentUser') ? true : false;
}

async function login(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        // console.error(errorObj);
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
