const mongoose = require('mongoose')

function connectDB() {
    mongoose.connect("mongodb://localhost:27017/dinestream")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDb connection error")
    })
}


module.exports = connectDB;