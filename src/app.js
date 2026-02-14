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
  const User = new user(
    req.body
  )

  try {
    await User.save();
    res.send("Sign in data added successfully");
  }catch (err) {

  }
});
