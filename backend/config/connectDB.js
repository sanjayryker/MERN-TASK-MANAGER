const mongoose = require('mongoose')

const connectDB = async () => 
{
    try
    {
        const connect = await mongoose.connect("mongodb://127.0.0.1:27017/Task-Manager")
        console.log("DB connected")

    }catch(error)
    {
        console.log(error.message);
        process.exit(1)
    }
}

module.exports = connectDB