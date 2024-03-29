const express = require('express');
const userSchema = require("../models/user");

const router = express.Router();

//create user
router.post('/users', (req, res) => {
    const user = userSchema(req.body)
    user
    .save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message: error}));

});

//get all
router.get('/users', (req, res) => {
    const user = userSchema(req.body);
    userSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message: error}));

});

//find one
router.get('/users/id:', (req, res) => {
    const {id} = req.params;
    userSchema
    .findById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message: error}));

});

router.put('/users/id:', (req, res) => {
    const {id} = req.params;
    const {name, age} = req.body;
    userSchema
    .updateOne({_id: id}, {$set: {name, age}})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message: error}));

});

router.delete('/users/id:', (req, res) => {
    const {id} = req.params;
    userSchema
    .deleteOne({_id: id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message: error}));

});

module.exports = router;