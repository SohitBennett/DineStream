const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser(req, rees){
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne(({
        email
    }))

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,

    }, JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

async function loginUser(req, res){

}

module.exports = {
    registerUser, 
    loginUser
}