const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller')
const authMiddleware = require('../middlewares/auth.middleware')

/* POST /api/food */
router.post('/', authMiddleware.authFoodPartnerMiddleware, foodController)

module.exports = router;