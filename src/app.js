const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute")
const profileRouter = require("./routes/profileRouter")
const requestRouter = require("./routes/requestRouter");
const userRouter = require("./routes/user");

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
app.use(cookieParser());

app.use("/",authRoute)
app.use("/profile",profileRouter)
app.use("/request",requestRouter)
app.use("/user",userRouter)



