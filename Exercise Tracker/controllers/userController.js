const User = require("../models/userModel");

const getUser = async (req, res) => {
  try {
    const users = await User.find({}, { username: 1 });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUser;
