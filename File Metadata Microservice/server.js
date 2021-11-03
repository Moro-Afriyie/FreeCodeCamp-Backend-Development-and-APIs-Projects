var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "./uploads" }); // dest: refers to the destination where the file will be uploaded

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// upload.single("name") must always contain the name attribute on the html input tag
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.status(200).json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
