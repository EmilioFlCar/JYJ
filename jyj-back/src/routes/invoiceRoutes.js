const express = require('express')
const router = express.Router()

const postInvoice = require('../controllers/InvoiceControllers/postInvoice')
const getInvoices = require('../controllers/InvoiceControllers/getInvoices')

router.get('/', getInvoices)
router.post('/', postInvoice)

module.exports = router