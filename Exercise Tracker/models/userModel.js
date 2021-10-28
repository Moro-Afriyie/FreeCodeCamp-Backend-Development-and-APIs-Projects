const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  description: String,
  duration: Number,
  date: {
    type: Date,
    default: () => {
      new Date().toDateString();
    },
  },
});

const UserSchema = new mongoose.Schema({
  username: String,
  excercise: ExerciseSchema,
  count: Number,
  logs: [ExerciseSchema],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
