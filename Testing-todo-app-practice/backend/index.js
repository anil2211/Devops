const express = require("express");
const UserController= require('./routes/user.route');
const mongoose = require("mongoose");
const routes = require("./routes/user.route");


// create server
const app = express();
//json parser
app.use(express.json());

//databse connection
const MONGO_URI=("mongodb+srv://anil:anil@cluster0.py7rmkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
mongoose.connect(MONGO_URI)
                .then(()=>console.log("connected"))
                .catch((error)=>console.log(error))

// app.use("/api/user",UserControllers);
app.use("/api/user", routes);
// single api for localhost:5000/
// app.get("/",(req,res)=>{
//     res.send("Hello from server")
// })
// app.get("/about",(req,res)=>{
//     res.send("About page")
// })

// start the server
port=5000
app.listen(port,()=>{
    console.log("server is running on port",port)
})