const express = require('express');
const authController = require('../controllers/auth.controller');


const router = express.Router();

router.post('/user/register', authController.registerUser)

module.exports = router;