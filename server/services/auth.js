const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const keys = require("../../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const register = async data => {
    try {
        const { message, isValid } = validateRegisterInput(data);
        
        if (!isValid) {
            throw new Error(message);
        }

        const { firstName, lastName, email, password } = data;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("Email already exists.")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User(
            {
                firstName,
                lastName,
                email,
                password: hashedPassword
            },
            err => {
                if (err) throw err;
            }
        )

        user.save();
        const token = jwt.sign({ _id: user._id }, keys.secretOrKey);
        return { token, loggedIn: true, ...user._doc, password: null };

    } catch (err) {
        throw err;
    }
};

const logout = async data => {
    try {
        const { _id } = data;
        user = await User.findById(_id);
        const token = "";
        return { token, loggedIn: false, ...user._doc, password: null }
    } catch (err) {
        throw err;
    }
};

const login = async data => {
    try {
        const { message, isValid } = validateLoginInput(data);

        if (!isValid) {
            throw new Error(message);
        }
        const { email, password } = data;
        const existingUser = await User.findOne({email});

        if (!existingUser) {
            throw new Error("Invalid credentials.")
        }
        const validPassword = await bcrypt.compareSync(password, existingUser.password)

        if (!validPassword) {
            throw new Error("Invalid credentials.")
        }
    
        const token = jwt.sign( { _id: existingUser._id }, keys.secretOrKey);
        return { token, loggedIn: true, ...existingUser._doc, password: null };

    } catch (err) {
        return { loggedIn: false };
    }
};

const verifyUser = async data => {
    try {
        const { token } = data;
        const decoded = jwt.verify(token, keys.secretOrKey);
        const { _id } = decoded;
        const loggedIn = await User.findById(_id).then(user => {
            return user ? true : false
        });

        return { loggedIn };
    } catch (err) {
        return { loggedIn: false };
    }
};

module.exports = { register, logout, login, verifyUser };