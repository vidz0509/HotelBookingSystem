import axios from 'axios';

export const hotelsServices = {
    getAllHotel,
    getHotelById,
    seachHotels,
    getAllRoomTypes,
    getAmenities,
    HotelsCount,
};

async function getAllHotel() {
    const url = `${process.env.REACT_APP_API_URL}/hotels`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function getHotelById(id) {
    const url = `${process.env.REACT_APP_API_URL}/hotels/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function seachHotels(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/hotels/searchHotels`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}
async function getAllRoomTypes() {
    const url = `${process.env.REACT_APP_API_URL}/roomtypes`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}
async function getAmenities() {
    const url = `${process.env.REACT_APP_API_URL}/amenities`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}
async function HotelsCount() {
    const url = `${process.env.REACT_APP_API_URL}/hotels/count`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}