const express = require('express')
const {readTimeTable} = require('./../controller/notionTimetableDBController')
const {protect} = require('./../controller/security')
const router = express.Router();

router.get('/',protect,readTimeTable)

module.exports = router