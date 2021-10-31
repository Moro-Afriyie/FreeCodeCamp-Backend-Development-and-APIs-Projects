const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Excercise = require("../models/exercise");
const Log = require("../models/logs");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const username = req.body.username;
  if (!username) {
    return res.status(404).json({ error: "invalid username" });
  }
  User.create(
    {
      username: username,
    },
    (err, data) => {
      res.json({ username: data.username, _id: data.id });
    }
  );
});

router.post("/:_id/exercises", async (req, res) => {
  if (!req.body) {
    return res.status(404).json({ error: "invalid details" });
  }
  const id = req.params._id;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date || new Date();
  const user = await User.findByIdAndUpdate({ _id: id }, {}, { new: true });
  // if (!id) {
  //   return res.status(404).json({ error: "invalid id" });
  // }

  // Excercise.create(
  //   {
  //     userid: req.params._id,
  //     username: userName.username,
  //     description: req.body.description,
  //     duration: req.body.duration,
  //     date: req.body.date || new Date(),
  //   },
  //   (err, data) => {
  //     res.json({
  //       username: data.username,
  //       description: data.description,
  //       duration: data.duration,
  //       date: data.date.toDateString(),
  //       _id: data.userid,
  //     });
  //   }
  // );
  // logs
});

//logs /api/users/:_id/logs?[from][&to][&limit]
router.get("", async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
