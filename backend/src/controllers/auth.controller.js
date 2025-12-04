const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser(req, res){
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
    const {email, password} = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, JWT_SECRET)

    res.cookie("token", token); 

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out sucessfully."
    })
}

async function registerFoodPartner(req, res){

    const {name, email, password} = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })


    if(isAccountAlreadyExists){
        res.status(400).json({
            message: "Food partner account already exists!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name, 
        email, 
        password: hashedPassword
    })

    const token = jwt.sign({
        id: foodPartner._id,
    }, JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "Food Partner registered successfully",
        user: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

async function loginFoodPartner(req, res){

    const {email, password} = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if(!foodPartner){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id
    }, JWT_SECRET)
    
    res.cookie("token", token)

    res.status(200).json({
        message: "Food partner looged in sucessfully!",
        foodPartner: {
            id: foodPartner._id, 
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

function logoutFoodPartner(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message: "Food patner logged out sucessfully!"
    })
}

module.exports = {
    registerUser, 
    loginUser, 
    logoutUser,
    registerFoodPartner,
    loginFoodPartner, 
    logoutFoodPartner
}


