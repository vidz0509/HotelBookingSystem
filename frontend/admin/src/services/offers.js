import axios from 'axios';

export const offersServices = {
    getAllOffers,
    addOffers,
    editOffers,
    getOffersById,
    softDeleteOffers,
    OffersCount,
    updateStatus
};

async function getAllOffers() {
    const url = `${process.env.REACT_APP_API_URL}/offers`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function addOffers(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/offers`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function editOffers(id,requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/offers/${id}`;
    return await axios.put(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function getOffersById(id) {
    const url = `${process.env.REACT_APP_API_URL}/offers/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function softDeleteOffers(id) {
    const url = `${process.env.REACT_APP_API_URL}/offers/softDelete/${id}`;
    return await axios.put(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function OffersCount() {
    const url = `${process.env.REACT_APP_API_URL}/offers/count`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function updateStatus(offersId, status) {
    let offersStatus = status ? 1 : 0;
    const url = `${process.env.REACT_APP_API_URL}/offers/updatestatus/${offersId}/${offersStatus}`;
    debugger;
    return await axios.put(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}
