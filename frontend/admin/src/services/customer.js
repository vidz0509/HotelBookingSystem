import axios from 'axios';

export const customerServices = {
    getAllCustomers,
    userCount,
    updateStatus
};


async function getAllCustomers() {
    const url = `${process.env.REACT_APP_API_URL}/users`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
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

async function updateStatus(id, status) {
    let userStatus = status ? 1 : 0;
    const url = `${process.env.REACT_APP_API_URL}/users/updatestatus/${id}/${userStatus}`;
    debugger;
    return await axios.put(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}