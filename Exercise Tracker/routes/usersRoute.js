const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { username: 1 });
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
    (err, user) => {
      res.json({ username: user.username, _id: user.id });
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
  const user = await User.findByIdAndUpdate(
    id,
    {
      $inc: { count: 1 },
      $push: {
        log: {
          description: description,
          duration: duration,
          date: date,
        },
      },
    },
    { new: true }
  ); // returns the updated document
  const logs = user.log[user.log.length - 1];

  res.json({
    username: user.username,
    description: logs.description,
    duration: logs.duration,
    date: logs.date.toDateString(),
    _id: user._id,
  });
});

//logs /api/users/:_id/logs?[from][&to][&limit]
router.get("/:_id/logs", async (req, res) => {
  try {
    const id = req.params._id;
    const userLogs = await User.findById(id);
    result = [];
    userLogs.log.forEach((log) => {
      result.push({
        description: log.description,
        duration: log.duration,
        date: log.date.toDateString(),
      });
    });

    res.json({
      _id: userLogs._id,
      username: userLogs.username,
      count: userLogs.count,
      log: result,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
