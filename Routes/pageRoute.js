const express  = require('express')
const {openLoginPage,openPromptPage} = require('./../controller/pageController')
const {protect} = require('./../controller/security')
const router = express.Router();

router.get("/login",openLoginPage);
router.get('/prompt',protect,openPromptPage);
module.exports = router 
