const mongoose = require("mongoose")
const connectDB = async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongoDb connected")
    } catch(error){
        console.error("MongoDb connection failed", error)
    }
    
}

module.exports = connectDB
