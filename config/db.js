
const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.mongoURI;

const connectDB = async () => {
    try{
        await mongoose.connect(db);
        console.log("Connected to DB");
    }catch(err){
        console.error(err.message);
    }
}

module.exports = connectDB;