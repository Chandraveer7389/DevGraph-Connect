const express = require("express")
const userRouter = express.Router()
const {auth} = require("../middlewares/auth")
const ConnectionRequestModel = require("../models/connectionRequest")
const User = require("../models/user")

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

userRouter.get("/connections", auth, async (req, res) => {
    try{
        const loggedInUser = req.userxyz
        const connections = await ConnectionRequestModel.find({
        $or :[
            {fromUserId : loggedInUser._id, status:"accepted"},
            {toUserId : loggedInUser._id, status:"accepted"}
            ]
        }).populate("fromUserId" , ["firstName", "lastName"])
        .populate("toUserId" , ["firstName", "lastName"])

        const data = connections.map((row) => { 
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId
            }
            return row.fromUserId
        }
        )
        res.send({
            message : "Fetched connections successfully",
            "Data" : data
        })

    }catch (err) {
        res.status(404).send("Error " +err.message)
    }

})

userRouter.get("/feed", auth, async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = limit > 50 ? 50 : limit;
        
        const skip = (page - 1) * limit;
        const loggedInUser = req.userxyz
        const connections = await ConnectionRequestModel.find({
        $or :[
            {fromUserId : loggedInUser._id},
            {toUserId : loggedInUser._id}
            ]
        }).select("fromUserId toUserId");
        const hideUsers = new Set()
        connections.forEach((u) => {
            hideUsers.add(u.fromUserId.toString())
            hideUsers.add(u.toUserId.toString())
        })
        const feedUser = await User.find({
            $and : [
                {_id : {$nin : Array.from(hideUsers)}},
                {_id :{$ne : loggedInUser._id}}
            ]
        }).select("firstName lastName").skip(skip).limit(limit)
        res.send(feedUser)

    }catch(err) {
        res.status(404).send("Error " + err.message)
    }
})

module.exports = userRouter