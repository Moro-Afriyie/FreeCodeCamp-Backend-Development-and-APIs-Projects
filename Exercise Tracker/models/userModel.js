const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  count: { type: Number, default: 0 },
  logs: [
    {
      description: String,
      duration: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
