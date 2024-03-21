import axios from 'axios';

export const bookingsServices = {
    payment,
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