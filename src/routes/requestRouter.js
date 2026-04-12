const express = require("express")
const requestRouter = express.Router();
const {auth} = require("../middlewares/auth")
const ConnectionRequestModel = require("../models/connectionRequest")


requestRouter.post("/send/:status/:userId", auth ,async (req,res) => {
    try{
        const toUserId = req.params.userId
        const status = req.params.status
        const fromUserId = req.userxyz._id;
        const Allowed_Status = ["interested","ignored"]
        const params_status = Allowed_Status.includes(status)
        if(!params_status){
            throw new Error("Invalid status Type")
        }

        const existingConnection = await ConnectionRequestModel.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId : toUserId ,toUserId : fromUserId}
            ]
        })
        if( existingConnection){
            throw new Error("Connection request already present")
        }

        const connection = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        })
        const data = await connection.save()
        res.send({"message" : "Connection Request successfull", "data" : data})



    }catch(err) {
        res.status(400).send("error occured : " + err.message)
    }

})

module.exports = requestRouter;
