const express = require('express')
const router = express.Router()

const postInvoice = require('../controllers/InvoiceControllers/postInvoice')
const getInvoices = require('../controllers/InvoiceControllers/getInvoices')
const updateInvoice = require('../controllers/InvoiceControllers/updateInvoice')

router.get('/', getInvoices)
router.post('/', postInvoice)
router.put('/update', updateInvoice)

module.exports = router