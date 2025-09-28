const foodModel = require('../models/food.model');

async function createFood(req, res) {

    const foodPartner = req.foodPartner;

    res.send("food items createed")

    // res.send("food item created")
}

module.exports = {
    createFood
}