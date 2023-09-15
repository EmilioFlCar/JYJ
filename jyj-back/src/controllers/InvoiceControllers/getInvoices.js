const { Invoice, Client, Rent, Equipment } = require('../../db')

const getInvoices = async function (req, res) {
    try {
        const { id } = req.query
        if (id) {
            const invoice = await Invoice.findByPk(id)
            res.status(200).json(invoice)
        } else {
            const invoices = await Invoice.findAll({
                include: [
                    {
                        model: Client,
                    },
                    {
                        model: Rent,
                        include: [
                            {
                                model: Equipment,
                                attributes: ['id', 'name', 'price'],
                                through: { attributes: [] }
                            },
                        ],
                    },
                ],

            })
            res.status(200).json(invoices)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = getInvoices