const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);

model.exports = UserModel;
