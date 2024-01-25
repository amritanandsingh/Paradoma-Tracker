const mongoose = require("mongoose");
// server.js
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() =>  { console.log("Connected to data Base") })
    .catch((error) =>  { console.log("Failed while connecting to dataBase!") });
    