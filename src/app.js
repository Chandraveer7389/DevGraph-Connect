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
  app.get("/hello", (req,res) => {
    res.send("Hello");
  })
  app.get("/", (req,res) => {
    res.send("Hello");
  })

app.post("/signin", async (req, res) => {
  const User = new user({
    firstName : "Radha",
    lastName : "Rani",
    email : "Radha@gmail.com",
    password : "Radha1234",
    age : 19,
    gender : "Female",
  })

  try {
    await User.save();
    res.send("Sign in data added successfully");
  }catch (err) {

  }
});
