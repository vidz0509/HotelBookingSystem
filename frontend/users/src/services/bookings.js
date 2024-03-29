import axios from 'axios';

export const bookingsServices = {
    payment,
    getBookingByUserId,
    formatDate
};

async function payment(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/bookings/payment`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function getBookingByUserId(id) {
    const url = `${process.env.REACT_APP_API_URL}/bookings/getbookingbyuserid/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

function formatDate(value) {
    let date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return day + ' ' + month + ' ' + year;
}