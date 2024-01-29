import axios from 'axios';

export const roomtypeServices = {
    getAllRoomType,
    addRoomType,
    editRoomType,
    getRoomTypeById,
    softDeleteRoomType
};

async function getAllRoomType() {
    const url = `${process.env.REACT_APP_API_URL}/roomtype`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function addRoomType(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/roomtype`;
    debugger;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function editRoomType(id,requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/roomtype/${id}`;
    return await axios.put(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function getRoomTypeById(id) {
    const url = `${process.env.REACT_APP_API_URL}/roomtype/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function softDeleteRoomType(id) {
    const url = `${process.env.REACT_APP_API_URL}/roomtype/softDelete/${id}`;
    return await axios.put(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}