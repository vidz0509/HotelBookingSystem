import axios from 'axios';

export const hotelsServices = {
    getAllHotel,
    seachHotels,
};

async function getAllHotel() {
    const url = `${process.env.REACT_APP_API_URL}/hotels`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}
async function seachHotels(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/hotels/searchHotels`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}