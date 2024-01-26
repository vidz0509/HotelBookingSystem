import axios from 'axios';

export const hotelsServices = {
    getAllHotel,
    addHotel,
    editHotel,
    getHotelById,
    deleteHotel
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

async function addHotel(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/hotels`;
    debugger;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function editHotel(id,requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/hotels/${id}`;
    return await axios.put(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function getHotelById(id) {
    const url = `${process.env.REACT_APP_API_URL}/hotels/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}
async function deleteHotel(id) {
    const url = `${process.env.REACT_APP_API_URL}/hotels/${id}`;
    return await axios.delete(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}