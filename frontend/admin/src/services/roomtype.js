import axios from 'axios';

export const roomtypeServices = {
    getAllRoomType,
    addRoomType,
    editRoomType,
    getRoomTypeById,
    softDeleteRoomType,
    RoomTypeCount,
    updateStatus
};

async function getAllRoomType() {
    const url = `${process.env.REACT_APP_API_URL}/roomtypes`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function addRoomType(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/roomtypes`;
    debugger;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function editRoomType(id,requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/roomtypes/${id}`;
    return await axios.put(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function getRoomTypeById(id) {
    const url = `${process.env.REACT_APP_API_URL}/roomtypes/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function softDeleteRoomType(id) {
    const url = `${process.env.REACT_APP_API_URL}/roomtypes/softDelete/${id}`;
    return await axios.put(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function RoomTypeCount() {
    const url = `${process.env.REACT_APP_API_URL}/roomtypes/count`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function updateStatus(roomtypeId, status) {
    let roomtypeStatus = status ? 1 : 0;
    const url = `${process.env.REACT_APP_API_URL}/roomtypes/updatestatus/${roomtypeId}/${roomtypeStatus}`;
    debugger;
    return await axios.put(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}
