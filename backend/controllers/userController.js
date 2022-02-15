const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


// @desc   Register new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check fields
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (user) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = User.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    if (newUser) {
        res.status(201)
        res.json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('User not created')
    }
})


// @desc   Authenticate a user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;


    const newUser = await User.findOne({ email });

    if (newUser && (await bcrypt.compare(password, newUser.password))) {
        res.json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

})


// @desc   Register new user
// @route  GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        _id,
        name,
        email
    });
})

//generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
};

module.exports = {
    registerUser,
    loginUser,
    getMe
}