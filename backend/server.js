// start server
const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app')
const connectDB = require('./src/db/db');

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log("server is running on port", port)
})
