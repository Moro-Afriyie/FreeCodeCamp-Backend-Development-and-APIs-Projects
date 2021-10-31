const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./routes/usersRoute");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect("mongodb://localhost:27017/exercise-tracker")
  .then((res) => console.log("connected to mongoDB"))
  .catch((err) => console.log("error"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", users);

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
