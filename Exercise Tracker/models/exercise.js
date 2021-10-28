const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
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
