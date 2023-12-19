export const validation = {
    isEmpty,
    isValidEmail,
    isValidPassword
};

function isEmpty(value) {
    return value === "" ? true : false;
}

function isValidEmail(email) {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

function isValidPassword(pwd){
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,15}$/; /* Min 8 chars Max 15 chars: 1 digit 1 Uppercase and 1 special char */
    return regex.test(pwd);
}