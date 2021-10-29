const express = require("express");
const router = express.Router();

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
  const userName = await User.findById(req.params._id);
  console.log(userName.username);
  // if (!id) {
  //   return res.status(404).json({ error: "invalid id" });
  // }
  if (!req.body) {
    return res.status(404).json({ error: "invalid details" });
  }
  Excercise.create(
    {
      userid: req.params._id,
      username: userName.username,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date || new Date(),
    },
    (err, data) => {
      // res.json({
      //   username: data.username,
      //   description: data.description,
      //   duration: data.duration,
      //   date: data.date.toDateString(),
      //   _id: data.userid,
      // });
      console.log(data);
    }
  );
});
