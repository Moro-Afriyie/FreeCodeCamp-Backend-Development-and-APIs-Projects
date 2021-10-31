const mongoose = require("mongoose");
const { ExerciseSchema } = require("./exercise");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  count: { type: Number, default: 0 },
  logs: [ExerciseSchema],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
