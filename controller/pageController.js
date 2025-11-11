const path = require("path");
const openLoginPage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "..", "view", "login.html"));
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};
const openPromptPage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "..", "view", "view.html"));
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};
module.exports = { openLoginPage, openPromptPage };
