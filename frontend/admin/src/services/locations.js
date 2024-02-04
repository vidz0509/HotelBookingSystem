import axios from 'axios';
export const countriesServices = {
    getAllCountries
}

async function getAllCountries() {
    const url = `${process.env.REACT_APP_API_URL}/countries`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

export const locationsServices = {
    getAllLocations,
    addLocation,
    editLocation,
    softDeleteLocation,
    getLocationById,
    locationCount,
    getLocationByCountry,
};



async function getAllLocations() {
    const url = `${process.env.REACT_APP_API_URL}/locations`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function addLocation(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/locations`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function editLocation(id, requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/locations/${id}`;
    return await axios.put(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function softDeleteLocation(id) {
    const url = `${process.env.REACT_APP_API_URL}/locations/softDelete/${id}`;
    return await axios.put(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function getLocationById(id) {
    const url = `${process.env.REACT_APP_API_URL}/locations/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function getLocationByCountry(id) {
    const url = `${process.env.REACT_APP_API_URL}/locations/getlocationbycountry/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function locationCount() {
    const url = `${process.env.REACT_APP_API_URL}/locations/count`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}