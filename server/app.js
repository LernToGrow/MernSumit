const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
require("./db/conn");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(require("./router/auth"));

// const User = require("./models/userSchema");



app.use(require("./router/auth"));
// //////plz check this part is not working
// dotenv.config({path:"./config.env"});
// const DB=process.env.DATABASE;
// data base connection

//middleware

const middleware= (req,res,next)=>{
    console.log("hello i am middleware");
}
middleware();
app.get("/",(req,res)=>{
    res.send("hello world from the server");
})

app.listen(port,()=>{
    console.log(`server is runnig at port number ${port}`);
});