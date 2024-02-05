import axios from 'axios';

export const customerServices = {
    getAllCustomers,
    userCount
};


async function getAllCustomers() {
    const url = `${process.env.REACT_APP_API_URL}/users`;
    // debugger;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        // console.error(errorObj);
        return errorObj;
    });
}

async function userCount() {
    const url = `${process.env.REACT_APP_API_URL}/users/count`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}