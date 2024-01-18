const express = require('express');
const mongoose = require('mongoose')
const connectDB = require('./config/connectDB')
const cors = require('cors');
const taskRoutes = require("./routes/taskRoute")
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(taskRoutes)


mongoose
.connect("mongodb://127.0.0.1:27017/Task-Manager")
.then(() =>
{
    app.listen(PORT, () => 
    {
        console.log(`Server is running on ${PORT}`)
    });
})
.catch((error) =>
{
    console.log(error)
})

