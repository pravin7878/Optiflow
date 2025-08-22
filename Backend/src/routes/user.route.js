const express = require("express");
const userRouter = express.Router()
const { authenticateUser } = require("../controlers/user.controler");
const validateLogin = require("../middelware/validateLogin")


// login user
userRouter.post("/login" ,validateLogin, authenticateUser);

module.exports = userRouter