const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  userid: String,
  username: String,
  description: String,
  duration: Number,
  date: {
    type: Date,
    default: () => {
      new Date().toDateString();
    },
  },
});

const ExerciseModel = mongoose.model("Exercise", ExerciseSchema);

module.exports = ExerciseModel;
