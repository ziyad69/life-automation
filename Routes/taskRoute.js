const express = require("express");
const {
  readTaskDB,
  createTaskDB,
   
} = require("./../controller/notionTaskDBController");
const {protect} = require('./../controller/security')
const router = express.Router();

router.get("/",protect, readTaskDB);
router.post("/",protect, createTaskDB);
 

module.exports = router;
