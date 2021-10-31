const mongoose = require("mongoose");
const { ExerciseSchema } = require("./exercise");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  count: { type: Number, required: true },
  log: [
    {
      description: String,
      duration: Number,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
