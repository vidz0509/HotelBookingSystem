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
    getLocationByCountry,
    locationCount,
};



async function getAllLocations(size = 1000) {
    const url = `${process.env.REACT_APP_API_URL}/locations?size=${size}`;
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

