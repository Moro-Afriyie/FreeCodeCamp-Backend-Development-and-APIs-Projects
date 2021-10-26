const mydbUri = process.env.DB_URI;
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dns = require("dns");
const mongoose = require("mongoose");
const urlParser = require("url");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
mongoose
  .connect(mydbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create a schema
const UrlSchema = mongoose.Schema({
  url: String,
});

// create a model
const UrlModel = mongoose.model("url", UrlSchema);

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
