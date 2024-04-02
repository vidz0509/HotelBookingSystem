import axios from 'axios';

export const hotelsServices = {
    getAllHotel,
    addHotel,
    editHotel,
    getHotelById,
    softDeleteHotel,
    HotelsCount,
    uploadImage,
    updateStatus
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

async function softDeleteHotel(id) {
    const url = `${process.env.REACT_APP_API_URL}/hotels/softDelete/${id}`;
    return await axios.put(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function HotelsCount() {
    const url = `${process.env.REACT_APP_API_URL}/hotels/count`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function uploadImage(formData, hotelId) {
    return await axios.post(`${process.env.REACT_APP_API_URL}/hotels/upload/${hotelId}`, formData, {
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

async function updateStatus(hotelId, status) {
    let hotelStatus = status ? 1 : 0;
    const url = `${process.env.REACT_APP_API_URL}/hotels/updatestatus/${hotelId}/${hotelStatus}`;
    debugger;
    return await axios.put(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}