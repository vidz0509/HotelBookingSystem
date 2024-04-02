export const validation = {
    isEmpty,
    isValidEmail,
    isValidPassword,
    isValidPhoneNo,
};

function isEmpty(value) {
    return value === "" ? true : false;
}

function isValidEmail(email) {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

function isValidPassword(pwd) {
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,15}$/; 
    return regex.test(pwd);
}

function isValidPhoneNo(phone) {
    const regex = /^[0-9]{1,10}$/g
    return regex.test(phone);
}