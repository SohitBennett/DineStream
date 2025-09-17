// start server

const app = require('./src/app')
const connectDB = require('./src/db/db');

connectDB();

const port = 5000;

app.listen(port, ()=>{
    console.log("server is running on port", port)
})
