const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  // userid: String,
  // username: String,
  count: { type: Number, required: true, default: log.length },
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

const LogModel = mongoose.model("Log", LogSchema);

module.exports = LogModel;
