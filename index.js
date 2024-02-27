const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');


const app = express();

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json()); //parse request body after making requests
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req,res)=>{
    res.send("Welcome to homepage");
});

app.get("/users", (req,res)=>{
    res.send("Welcome to user page");
});

app.listen(8800,()=>{
    console.log("Backend server is running");
});