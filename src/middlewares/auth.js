const User = require("../models/user")
const jwt = require('jsonwebtoken');
const auth = async (req,res,next) => {
    try{
        const {token} = req.cookies
        if (!token) {
            throw new Error("Token not valid");
        }
        const decoded = jwt.verify(token,"Secret_key_dev")
        const user = await User.findById(decoded._id)
        if(!user) {
            throw new Error("No user found");
        }
        req.userxyz = user
        next()

    }catch (err) {
        res.status(400).send("Error occured: " + err.message)
    }

}
module.exports = {auth}