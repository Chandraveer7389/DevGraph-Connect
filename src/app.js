const express = require("express");
const app = express();

app.use(
  "/",
  [(req, res, next) => {
    console.log("Handler 1")
    res.send("Res 1");
    next();
  }],
  (req, res, next) => {
    console.log("Handler 2")
    //res.send("res 2");
    next();
  },
);
app.listen(7000, () => {
  console.log("Server listening at the port");
});
