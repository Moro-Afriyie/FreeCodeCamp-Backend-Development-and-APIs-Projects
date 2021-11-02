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
    // console.log(req.query);
    //http://localhost:8000/api/users/617fb79c79d2c4ee81de2aec/logs?from=2021-10-01&to=2021-11-30&limit=4
    const qfrom = req.query.from;
    const qto = req.query.to;
    const qlimit = req.query.limit;
    const from = new Date(qfrom);
    const to = new Date(qto);
    console.log("query params: ", req.query);
    console.log("from : ", from);
    console.log("new: ", to);
    //http://localhost:8000/api/users/61801f68f8747dcfa51a10e4/logs?from=2021-11-04&to=2021-11-05&limit=4
    // User.findById(id, {
    //   log: { $elemMatch: { date: { $gte: from, $lt: to } } },
    // }).exec((err, data) => {
    //   if (err) console.log(err);
    //   console.log(data);
    // });
    // User.findById(id, {
    //   log: { date: { $gte: from, $lt: to } },
    // }).exec((err, data) => {
    //   if (err) console.log(err);
    //   console.log(data);
    // });
    User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
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
              parseInt(qlimit),
            ],
          },
        },
      },
    ])
      .then((log) => {
        log[0].count = log[0].log.length;

        res.json(log);
      })
      .catch((err) => {
        next(err);
      });

    // const id = req.params._id;
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

    // query parameters
    /*/**
    {"_id":,"username":","from":"Fri Oct 01 2021","to":"Fri Oct 01 2021","count":0,"log":[]}
     * var from = new Date('2014-05-18T20:00:00.000Z');
      var to = new Date('2014-05-19T20:00:00.000Z');

      db.collection.find({startTime: {$gt: from, $lt:to}});
     */
  } catch (error) {
    console.log(error);
  }
};

module.exports.getUsers = getUsers;
module.exports.postUser = postUser;
module.exports.postExercise = postExercise;
module.exports.getLogs = getLogs;
