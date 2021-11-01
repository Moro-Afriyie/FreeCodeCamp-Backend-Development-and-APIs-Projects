const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);

router.post("/", userController.postUser);

router.post("/:_id/exercises", userController.postExercise);

//logs /api/users/:_id/logs?[from][&to][&limit]
router.get("/:_id/logs", async (req, res) => {
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
});

module.exports = router;
