import axios from 'axios';

export const offersServices = {
    getAllOffers
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
