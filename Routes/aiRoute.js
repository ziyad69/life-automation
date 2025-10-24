const express = require('express');
const {aiPromptCreate} = require('./../AI/services')
const {protect} = require('./../controller/security')

const router = express.Router();

router.post('/',protect,aiPromptCreate)
module.exports = router