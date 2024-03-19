import axios from 'axios';

export const hotelsServices = {
    getAllHotel,
    getHotelById,
    searchHotels,
    getAllRoomTypes,
    getAmenities,
    HotelsCount,
    getRoomsByHotelId,
    getArrayFromQueryString
};

async function getAllHotel(size = 1000) {
    const url = `${process.env.REACT_APP_API_URL}/hotels?size=${size}`;
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

async function searchHotels(requestBody) {
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

async function getRoomsByHotelId(id) {
    const url = `${process.env.REACT_APP_API_URL}/rooms/RoomByHotel/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

function getArrayFromQueryString(queryString) {
    const params = new URLSearchParams(queryString);
    const roomDetails = [];

    params.forEach((value, key) => {
        const matches = key.match(/^room\[(\d+)\]\[(\w+)\]$/);
        if (matches) {
            const [, index, subKey] = matches;
            const objIndex = parseInt(index);

            if (!roomDetails[objIndex]) {
                roomDetails[objIndex] = {};
            }

            roomDetails[objIndex][subKey] = value;
        }
    });

    return roomDetails.filter(Boolean);
}