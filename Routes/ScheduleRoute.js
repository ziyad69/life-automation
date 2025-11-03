const express = require("express")
const {readScheduleDB,createSchedule,updateSchedule} = require("./../controller/ScheduleDBController")
const {protect} = require('./../controller/security')
const router = express.Router()

router.get("/",readScheduleDB)
router.post("/",protect,createSchedule)
router.patch("/:id",protect,updateSchedule)

module.exports = router