const express = require('express');
const router = express.Router();
const controller=require("../controller/user.controller");

router .post('/postUser',controller.postUser);

module.exports=router;