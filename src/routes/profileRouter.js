const express = require("express")
const {auth} = require("../middlewares/auth")
const User = require("../models/user")
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

module.exports = profileRouter;