const express = require("express")
const {auth} = require("../middlewares/auth")
const User = require("../models/user")
const bcrypt = require("bcrypt");
const validator = require('validator');
const validateEditProfile = require("../utility/validateEditProfile")
const profileRouter = express.Router()

profileRouter.get("/view", auth ,async (req,res) => {
  const user = req.userxyz
    res.send(user.firstName)

})

profileRouter.patch("/edit",auth, async (req, res) => {
  const user = req.userxyz
  try {
        if(!validateEditProfile(req)) {
          throw new Error("Updates not allowed");
        }
      Object.keys(req.body).forEach((field) => user[field] = req.body[field])
      await user.save()
      res.send(user.firstName + " your Update is successfull")
  } catch (err) {
    res.status(401).send("Request failed: " + err.message);
  }
});

profileRouter.patch("/changePassword", auth, async (req, res) => {
  try{
  const user = req.userxyz
  const {currentPassword, newPassword} = req.body;
  if(!validator.isStrongPassword(newPassword)) {
    throw new Error("weak password Found")
  }
  const isPassword =await user.validPassword(currentPassword)
  if(!isPassword) {
    throw new Error("Incorrect password")
  }
  const hashNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashNewPassword
  await user.save()
  res.send("Password update successfull")}
  catch (err) {
    res.status(400).send("error occured : " + err.message)
  }
})
module.exports = profileRouter;