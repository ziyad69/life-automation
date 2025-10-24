const express = require("express");
const { readUsers, addUser,login } = require("./../controller/userDBController");
 
const router = express.Router();

router.get("/", readUsers);
router.post("/", addUser);
router.post('/login',login)
module.exports = router;
