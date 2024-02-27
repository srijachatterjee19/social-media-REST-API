const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');


const app = express();

dotenv.config();

app.listen(8800,()=>{
    console.log("Backend server is running");
})