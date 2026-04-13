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

requestRouter.post("/review/:status/:requestedId", auth, async(req, res) => {
    try{
        const loggedInUser = req.userxyz
        const {status, requestedId} = req.params

        const AllowedStatus = ["accepted","rejected"]

        if(!AllowedStatus.includes(status)){
            throw new Error("Invalid Status Code")
        }

        const connectionRequest = await ConnectionRequestModel.findOne({
            _id:requestedId,
            toUserId:loggedInUser._id,
            status:"interested"
        })

        if(!connectionRequest){
            throw new Error("Id not found")
        }

        connectionRequest.status = status

        const data = await connectionRequest.save()

        res.send({message:"Connection review request successfull",
            "data":data
        })

    }catch(err) {
        res.status(400).send("Error " + err.message)
    }
})

module.exports = requestRouter;
