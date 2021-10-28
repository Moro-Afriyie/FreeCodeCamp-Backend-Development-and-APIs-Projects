const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  count: { type: Number, required: true },
  log: [
    {
      description: String,
      duration: Number,
      date: {
        type: Date,
        default: () => {
          new Date().toDateString();
        },
      },
    },
  ],
});

const LogModel = mongoose.model("Log", LogSchema);

module.exports = { LogModel, LogSchema };
