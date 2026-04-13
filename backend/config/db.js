const mongoose = require("mongoose");
const url = "mongodb+srv://yug:Yuzi%400311@firstcluster.p0w8aqr.mongodb.net/Notes_Basic";

const connectDB = async ()=>{
    await mongoose.connect(url);
    console.log("Database connected");
}
module.exports = connectDB;