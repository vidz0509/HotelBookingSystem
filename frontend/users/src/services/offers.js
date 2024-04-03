import axios from 'axios';

export const offersServices = {
    getAllOffers,
    getOffersByCode
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