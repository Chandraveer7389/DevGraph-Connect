const express = require("express")
const {auth} = require("../middlewares/auth")
const User = require("../models/user")
const profileRouter = express.Router()

profileRouter.get("/user", auth ,async (req,res) => {
  const user = req.userxyz
    res.send(user.firstName)

})

profileRouter.patch("/updateUser", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const Allower_Update = ["age", "firstName", "lastName", "userId"];
    const doUpdate = Object.keys(data).every((k) => Allower_Update.includes(k));
    if (!doUpdate) {
      throw new Error("update not allowed");
    }
    const u = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send("Update successfully");
  } catch (err) {
    res.status(404).send("Request failed: " + err.message);
  }
});

module.exports = profileRouter;