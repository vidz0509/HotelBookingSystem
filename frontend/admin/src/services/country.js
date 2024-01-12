import axios from 'axios';

export const countriesServices = {
    getAllCountries
};


async function getAllCountries() {
    const url = `${process.env.REACT_APP_API_URL}/countries`;
    // debugger;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        // console.error(errorObj);
        return errorObj;
    });
}