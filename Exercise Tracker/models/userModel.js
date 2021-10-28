const mongoose = require("mongoose");
const { LogSchema } = require("./log");
const { ExerciseSchema } = require("./exercise");

const UserSchema = new mongoose.Schema({
  username: String,
  excercise: ExerciseSchema,
  logs: LogSchema,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
