const express = require("express");
const teamRouter  = express.Router()
const User = require("../models/user")
const { createMember } = require("../controlers/teams");
const validateRegisterBody  = require("../middelware/validateRegister");
const userRouter = require("./user.route");

// get all Member
teamRouter.get("/" , async(req,res)=>{
    try {
        const members = await User.find({ role: { $ne: "admin" } }).select("-password")
        res.status(200).json(members)
    } catch (err) {
        console.log(err);
        res.status(500).json("internal server error")
    }
})

// get single Member
teamRouter.get("/:memberId" , async(req,res)=>{
    const {memberId} = req.params
    console.log(memberId)
    try {
        const members = await User.findOne({ _id : memberId }).select("-password")
        console.log(members)
        res.status(200).json(members)
    } catch (err) {
        console.log(err);
        res.status(500).json("internal server error")
    }
})


// Create New Member
teamRouter.post("/add-new-member" ,validateRegisterBody, createMember);

module.exports = teamRouter