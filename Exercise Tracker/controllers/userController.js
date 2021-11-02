const User = require("../models/userModel");
const mongoose = require("mongoose");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { username: 1 });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

const postUser = async (req, res) => {
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
};

const postExercise = async (req, res) => {
  if (!req.body) {
    return res.status(404).json({ error: "invalid details" });
  }
  const id = req.params._id;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date || new Date().toISOString();
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
};

//logs /api/users/:_id/logs?[from][&to][&limit]
const getLogs = async (req, res, next) => {
  try {
    const id = req.params._id;
    let from = req.query.from;
    let to = req.query.to;
    let limit = req.query.limit;
    if (from) {
      from = new Date(from);

      if (to) {
        to = new Date(to);
      } else {
        to = new Date();
      }
    } else {
      from = new Date(0);
      to = new Date("2999-12-31");
    }

    if (!limit || limit == 0) {
      limit = 9999;
    } else {
      limit = parseInt(limit);
    }
    const userLogs = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          count: 1,
          log: {
            $slice: [
              {
                $filter: {
                  input: "$log",
                  as: "log",
                  cond: {
                    $and: [
                      { $gte: ["$$log.date", from] },
                      { $lte: ["$$log.date", to] },
                    ],
                  },
                },
              },
              limit,
            ],
          },
        },
      },
    ]);
    res.json(userLogs);
    // const userLogs = await User.findById(id);
    // result = [];
    // userLogs.log.forEach((log) => {
    //   result.push({
    //     description: log.description,
    //     duration: log.duration,
    //     date: log.date.toDateString(),
    //   });
    // });

    // res.json({
    //   _id: userLogs._id,
    //   username: userLogs.username,
    //   count: userLogs.count,
    //   log: result,
    // });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getUsers = getUsers;
module.exports.postUser = postUser;
module.exports.postExercise = postExercise;
module.exports.getLogs = getLogs;
