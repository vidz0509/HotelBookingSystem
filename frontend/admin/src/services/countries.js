import axios from 'axios';

export const countriesServices = {
    getAllCountries,
    addCountry,
    editCountry,
    getCountryById,
    softDeleteCountry,
    countryCount,
    uploadImage,
    updateStatus
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

async function editCountry(id, requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/countries/${id}`;
    return await axios.put(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function softDeleteCountry(id) {
    const url = `${process.env.REACT_APP_API_URL}/countries/softDelete/${id}`;
    return await axios.put(url).then(response => {
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

async function uploadImage(formData, countryId) {
    return await axios.post(`${process.env.REACT_APP_API_URL}/countries/upload/${countryId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error);
        });
}


async function updateStatus(countryId, status) {
    let countryStatus = status ? 1 : 0;
    const url = `${process.env.REACT_APP_API_URL}/countries/updatestatus/${countryId}/${countryStatus}`;
    debugger;
    return await axios.put(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}