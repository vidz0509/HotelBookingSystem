import axios from 'axios';

export const offersServices = {
    getAllOffers,
    getOffersByCode,
    discountByCode
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

async function getOffersByCode(code) {
    const url = `${process.env.REACT_APP_API_URL}/offers/${code}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function discountByCode(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/offers/calculateDiscount`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}