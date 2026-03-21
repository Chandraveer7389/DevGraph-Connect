const express = require("express")
const requestRouter = express.Router();
const {auth} = require("../middlewares/auth")


requestRouter.post("/send", auth ,(req,res) => {
    res.send("Sending request");

})

module.exports = requestRouter;
