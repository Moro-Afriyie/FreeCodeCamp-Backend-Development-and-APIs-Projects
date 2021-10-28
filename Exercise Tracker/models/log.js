const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.types.ObjectID, ref: "User" },
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
