const express = require("express")
const User = require("../models/user")
const {validate} = require("../utility/validate");
const bcrypt = require('bcrypt');
const authRoute = express.Router();

authRoute.post("/login" ,async (req,res) => {
  try{
    const {email,password} = req.body;
    const userId = await User.findOne({email : email})
    if(!userId) {
      throw new Error("Invalid email")
    }
    const isPassword = await userId.validPassword(password)
    if(isPassword) {
      const token = await userId.getJwt()
      res.cookie("token",token);
      res.send("Login successfull")
    } else {
      throw new Error("invalid password");
    }
  }catch (err) {
    res.status(404).send("ERROR " + err.message);
  }
})

authRoute.post("/signin", async (req, res) => {
 // validate 
  try {
    validate(req.body);
    // 
    const { firstName, lastName, email, password, age, gender, skills } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
     const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword, // Save the HASH, not the plain text!
      age,
      gender,
      skills
    });
    await user.save();
    res.send("Sign in data added successfully");
  } catch (err) {
    res.status(404).send("sign in error" + err.message);
  }
});
module.exports = authRoute