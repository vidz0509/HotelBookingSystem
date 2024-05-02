import axios from 'axios';

export const reviewsServices = {
    getAllReviews,
    addReviews,
    getReviewsById,
    ReviewsCount,
};

async function getAllReviews() {
    const url = `${process.env.REACT_APP_API_URL}/reviews`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function addReviews(requestBody) {
    const url = `${process.env.REACT_APP_API_URL}/reviews`;
    debugger;
    return await axios.post(url, requestBody).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function getReviewsById(id) {
    const url = `${process.env.REACT_APP_API_URL}/reviews/${id}`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}

async function ReviewsCount() {
    const url = `${process.env.REACT_APP_API_URL}/reviews/count`;
    return await axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        let errorObj = error.response.data;
        return errorObj;
    });
}