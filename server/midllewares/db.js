const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const mongoURI =process.env.MONGO_URI;
const connection = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        //console.log("connection Successfully");
    })
}


module.exports = connection;