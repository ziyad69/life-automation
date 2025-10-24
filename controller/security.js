const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("./../models/userModels");

const createToken = (user, statusCode, res) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,  
    sameSite: 'strict'
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).send("success");
};
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;  
    if (!token) {
      res.status(500).send("oops you havn't access to my life");
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      res.status(500).send("password or email is wrong");
    }
    next();
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};
module.exports = { createToken, protect };
