const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
    data.firstName = validText(data.firstName) ? data.firstName : "";
    data.lastName = validText(data.lastName) ? data.lastName : "";
    data.email = validText(data.email) ? data.email : "";
    data.password = validText(data.password) ? data.password : "";

    if (Validator.isEmpty(data.firstName)) {
        return { message: "First name is required.", isValid: false };
    }

    if (Validator.isEmpty(data.lastName)) {
        return { message: "Last name is required.", isValid: false };
    }

    if (Validator.isEmpty(data.email)) {
        return { message: "Email field is required.", isValid: false };
    }

    if (!Validator.isEmail(data.email)) {
        return { message: "Please enter a valid email.", isValid: false };
    }

    if (Validator.isEmpty(data.password)) {
        return { message: "Password field is required", isValid: false };
    }

    if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
        return { message: "Password must be 6 to 20 characters.", isValid: false };
    }

    return {
        message: "Successfully registered",
        isValid: true
    };
}