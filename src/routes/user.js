const express = require("express")
const userRouter = express.Router()
const {auth} = require("../middlewares/auth")
const ConnectionRequestModel = require("../models/connectionRequest")

userRouter.get("/pending/requests", auth , async (req, res) => {
    try{
        const loggedInUser = req.userxyz
        const connectionRequest = await ConnectionRequestModel.find({
            toUserId : loggedInUser._id,
            status : "interested"
        }).populate("fromUserId" , ["firstName", "lastName"])
        const data = connectionRequest.map((row) => row.fromUserId)
        res.send({
            message : "Data Fetched Successfully",
            "data" : data
        })


    }catch(err){
        res.status(400).send("Error " + err.message)
    }

})

module.exports = userRouter