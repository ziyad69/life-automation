const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.methods.isCorrectPassword = async function (
  password,
  passwordCheck
) {
  return await bcrypt.compare(password, passwordCheck);
};

userSchema.pre("save", async function (next) {
  this.password = bcrypt.hash(this.password, 12);
  next();
});
const user = mongoose.model("users", userSchema);

module.exports = user;
