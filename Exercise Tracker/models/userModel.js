const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  description: { type: String, default: "" },
  duration: { type: String, default: 0 },
  date: {
    type: Date,
    default: Date,
  },
});

const UserSchema = new mongoose.Schema({
  username: String,
  excercise: {
    type: ExerciseSchema,
    default: {
      description: "",
      duration: 0,
      date: new Date().toString(),
    },
  },
  count: { type: Number, default: 0 },
  logs: {
    type: [ExerciseSchema],
    default: {
      description: "",
      duration: 0,
      date: new Date().toString(),
    },
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
