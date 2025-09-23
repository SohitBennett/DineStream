const express = require('express');
const authController = require('../controllers/auth.controller');


const router = express.Router();

//User Auth apis
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)

//Food patner auth apis 
router.post('/food-partner/register', authController.registerFoodPartner)
router.post('/food-partner/login', authController.loginFoodPartner)
router.get('/food-partner/logout', authController.logoutFoodPartner)

module.exports = router;