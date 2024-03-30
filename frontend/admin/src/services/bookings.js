import axios from 'axios';

export const bookingsServices = {
    getAllBookings,
    BookingsCount,
};

async function getAllBookings() {
    const url = `${process.env.REACT_APP_API_URL}/bookings`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function BookingsCount() {
    const url = `${process.env.REACT_APP_API_URL}/bookings/count`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}
