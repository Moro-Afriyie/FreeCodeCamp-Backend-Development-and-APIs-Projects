const Joi = require("joi");
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
  const schema = Joi.object({
    username: Joi.string().required(),
  });

  const result = schema.validate({ username: username });

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const checkUserExists = await User.findOne({ username: username });

  if (checkUserExists) {
    return res.status(409).send("username already exits");
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
    return res.status(400).json({ error: "invalid details" });
  }

  const schema = Joi.object({
    id: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.number().required(),
  });

  const result = schema.validate({
    id: req.params._id,
    description: req.body.description,
    duration: req.body.duration,
  });

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  if (
    req.body.date !== "" &&
    !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(req.body.date)
  ) {
    return res
      .status(400)
      .send(
        `date with value ${req.body.date} fails to match the required pattern: yyyy-mm-dd`
      );
  }
  const id = req.params._id;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date || new Date().toISOString();
  // check if there is a user with the id
  try {
    const checkValidId = await User.findById(id);
    if (!checkValidId) {
      return res.status(400).send({ error: "invalid user" });
    }
  } catch (err) {
    return res.status(400).send({ error: "invalid Id" });
  }
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

    result = [];
    userLogs[0].log.forEach((log) => {
      result.push({
        description: log.description,
        duration: log.duration,
        date: log.date.toDateString(),
      });
    });

    res.json({
      _id: userLogs[0]._id,
      username: userLogs[0].username,
      count: userLogs[0].count,
      log: result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getUsers = getUsers;
module.exports.postUser = postUser;
module.exports.postExercise = postExercise;
module.exports.getLogs = getLogs;
