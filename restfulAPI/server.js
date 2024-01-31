const mongo = require('mongodb');
//const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
//const userRoutes = require("./routes/users");
//const userSchema = require("./models/user");
const { error } = require('console');
const app = express();
//middleware
app.use(express.json());




const port = 3000;



const connectionString = process.env.ATLAS_URI || "";
const client = new mongo.MongoClient(connectionString);
let conn, db;
async function conndb() {
    try {
        conn = await client.connect();
        db = conn.db("RestfulAPI");
        console.log('Icarly online')
      } catch(e) {
        console.error(e);
      }
}

conndb();
exports.db;


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/", (req, res) => {
  res.send("welcome to my api");
})
//get all
app.get("/users", async (req, res) => {
    let collection = await db.collection("wadle");
    let result = await collection.find({}).toArray();
    res.send(result);
    {/*const user = userSchema(req.body);
    userSchema
    .find()
    .then((data)=>res.json(data))
.catch((error)=>res.json({message: error}));*/}
  });




app.patch("/users/:id", async (req, res) => {
    let query = {_id: new mongo.ObjectId(req.params.id)};
    const updates = {
      $set: {"name": "The most wanted"}
    };
    let collection = await db.collection("wadle");
    let result = await collection.updateOne(query, updates)

    res.send(result).status(200);
  });



app.delete("/users/:id", async (req, res) => {
  let query = {_id: new mongo.ObjectId(req.params.id)};
  
  let collection = await db.collection("wadle");
  let result = await collection.deleteOne(query)

  res.send(result).status(200);
  });



  app.post("/users", async (req, res) => {
    let newDocument = req.body;
    console.log(newDocument);
    let result = await db.collection("wadle").insertOne(newDocument);
    res.send(result).status(204);
  });

  



app.listen(port, function(){
    console.log('server on');
})