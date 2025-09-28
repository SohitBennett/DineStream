const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage(),
})

/* POST /api/food */
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood)

module.exports = router;