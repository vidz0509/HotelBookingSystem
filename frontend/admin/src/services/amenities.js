import axios from 'axios';

export const amenitiesServices = {
    getAllAmenities,
    addAmenities,
    editAmenities,
    getAmenitiesById,
    softDeleteAmenities,
    AmenitiesCount,
};

async function getAllAmenities() {
    const url = `${process.env.REACT_APP_API_URL}/amenities`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function addAmenities(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/amenities`;
    debugger;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function editAmenities(id,requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/amenities/${id}`;
    return await axios.put(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function getAmenitiesById(id) {
    const url = `${process.env.REACT_APP_API_URL}/amenities/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function softDeleteAmenities(id) {
    const url = `${process.env.REACT_APP_API_URL}/amenities/softDelete/${id}`;
    return await axios.put(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function AmenitiesCount() {
    const url = `${process.env.REACT_APP_API_URL}/amenities/count`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}
