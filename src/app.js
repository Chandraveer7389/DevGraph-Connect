const express = require("express");
const app = express();

app.use("/admin", (req, res, next) => {
  let token = "ab";
  if (token === "a") {
    next();
  } else {
    res.status(404).send("Not authorized");
  }
});

app.delete("/admin/deleteData", (req, res) => {
  res.send("Data deleted");
});
app.get("/admin/getData", (req, res) => {
  res.send("user data");
});

app.listen(7000, () => {
  console.log("Server listening at the port");
});
