const express = require('express')
const router = express.Router()

const getRents = require('../controllers/RentControllers/getRents.js')

router.get('/', getRents)

module.exports = router