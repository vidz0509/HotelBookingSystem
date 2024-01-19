import axios from 'axios';

export const countriesServices = {
    getAllCountries,
    addCountry,
    editCountry,
    getCountryById
};

async function getAllCountries() {
    const url = `${process.env.REACT_APP_API_URL}/countries`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function addCountry(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/countries`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function editCountry(id,requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/countries/${id}`;
    return await axios.put(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function getCountryById(id) {
    const url = `${process.env.REACT_APP_API_URL}/countries/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}