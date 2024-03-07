import axios from 'axios';

export const countriesServices = {
    getAllCountries,
    getCountryById,
    countryCount,
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

async function getCountryById(id) {
    const url = `${process.env.REACT_APP_API_URL}/countries/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}
async function countryCount() {
    const url = `${process.env.REACT_APP_API_URL}/countries/count`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}
