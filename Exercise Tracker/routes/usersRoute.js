const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);

router.post("/", userController.postUser);

router.post("/:_id/exercises", userController.postExercise);

router.get("/:_id/logs", userController.getLogs);

module.exports = router;
