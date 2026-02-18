const express = require("express");
const app = express();
const connectDB = require("./config/database");
const user = require("./models/user");
connectDB()
  .then(() => {
    console.log("Data base connected successfuly");
    app.listen(7000, () => {
      console.log("Server listening at the port");
    });
  })
  .catch((err) => {
    console.log("Data base connection failed");
  });
app.use(express.json());
app.post("/signin", async (req, res) => {
  const User = new user(req.body);

  try {
    await User.save();
    res.send("Sign in data added successfully");
  } catch (err) {}
});
app.delete("/deleteUser", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await user.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(404).send("Not able to delete the user");
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await user.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("No user present");
  }
});
app.patch("/updateUser", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const u = await user.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
    });
    res.send("Update successfully")
  } catch (err) {
    res.status(404).send("User not found");
  }
});
