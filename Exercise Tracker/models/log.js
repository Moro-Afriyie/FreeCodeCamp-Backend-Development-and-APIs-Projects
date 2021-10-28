const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  username: { type: String, required: true },
  count: { type: Number, required: true },
  log: [
    {
      username: { type: String, required: true },
      duration: { type: Number, required: true },
      date: { type: Date, required: true },
    },
  ],
});

const LogModel = mongoose.model("Log", LogSchema);

model.exports = LogModel;
