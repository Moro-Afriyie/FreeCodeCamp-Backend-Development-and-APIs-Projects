const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Excercise = require("./models/exercise");
const Logs = require("./models/log");
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

app.post("/api/users", async (req, res) => {
  const username = req.body.username;
  if (!username) {
    return res.status(404).json({ error: "invalid username" });
  }
  User.create(
    {
      username: username,
    },
    (err, data) => {
      console.log(data);
      res.json({ username: data.username, _id: data.id });
    }
  );
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  const { username } = await User.findById(req.params._id);
  console.log(username);
  // if (!id) {
  //   return res.status(404).json({ error: "invalid id" });
  // }
  if (!req.body) {
    return res.status(404).json({ error: "invalid details" });
  }
  Excercise.create(
    {
      userID: req.params._id,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date,
    },
    (err, data) => {
      res.json(data);
    }
  );
});
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
