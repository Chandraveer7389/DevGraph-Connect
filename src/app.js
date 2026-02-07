const express = require("express");
const app = express();

app.get("/home", (req, res) => {
  res.send("magic");
});
app.post("/home", (req, res) => {
  res.send("This is a post request");
});

app.listen(7000, () => {
  console.log("Server listening at the port");
});
