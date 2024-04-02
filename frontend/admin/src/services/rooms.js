import axios from 'axios';

export const roomsServices = {
    getAllRooms,
    addRoom,
    editRoom,
    getRoomById,
    softDeleteRoom,
    roomCount,
    uploadImage,
    updateStatus
};

async function getAllRooms() {
    const url = `${process.env.REACT_APP_API_URL}/rooms`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function addRoom(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/rooms`;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function editRoom(id, requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/rooms/${id}`;
    return await axios.put(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function softDeleteRoom(id) {
    const url = `${process.env.REACT_APP_API_URL}/rooms/softDelete/${id}`;
    return await axios.put(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function getRoomById(id) {
    const url = `${process.env.REACT_APP_API_URL}/rooms/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function roomCount() {
    const url = `${process.env.REACT_APP_API_URL}/rooms/count`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function uploadImage(formData, roomId) {
    return await axios.post(`${process.env.REACT_APP_API_URL}/rooms/upload/${roomId}`, formData, {
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


async function updateStatus(roomsId, status) {
    let roomStatus = status ? 1 : 0;
    const url = `${process.env.REACT_APP_API_URL}/rooms/updatestatus/${roomsId}/${roomStatus}`;
    debugger;
    return await axios.put(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}