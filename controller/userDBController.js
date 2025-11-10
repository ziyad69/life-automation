const User = require("./../models/userModels");

const { createToken } = require("./security");

const readUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).send("failed to read user");
  }
};
const addUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(200).send("success");
  } catch (error) {
    res.status(500).send("failed to add user");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
     return res.status(500).send("plz enter email or password");
    }
    const user = await User.findOne({ email });

    if (!user || !(await user.isCorrectPassword(user.password, password))) {
      return res.status(500).send("email or password is not correct");
    }
    createToken(user, 200, res);
  } catch (err) {
    res.status(500).send("failed to login");
  }
};

module.exports = { readUsers, addUser, login };
