const mongo = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const userRoutes = require("./routes/users");
const { error } = require('console');

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use('/api', userRoutes);


//routes
app.get("/", (req, res) => {
    res.send("welcome to my api");
})


//mongodb connection
mongoose
    .connect(process.env.ATLAS_URI)
    .then(()=>console.log("connected to MongoDB Atlas"));
    
    
    

app.listen(port, () => console.log("server listening on port", port));