const { Client, Equipment, Invoice, Rent, conn } = require("../../db");
const calculateCost = require("../../helpers/calculateCost");
const calculateDays = require("../../helpers/calculateDays");

const postInvoice = async function (req, res) {
  const { clientID, equipmentData } = req.body;

  try {
    const client = await Client.findByPk(clientID)

    if (!client) {
      throw new Error('El cliente con la identificación especificada no existe.');
    } else {
      let factura = null

      const facturas = await conn.transaction(async (t) => {
        let totalInvoice = 0;
        const rents = [];

        const newInvoice = await Invoice.create({}, { transaction: t });

        for (const item of equipmentData) {
          const { daysToRent, itemInfo, numberOfItemsToRent } = item;
          const equipment = await Equipment.findByPk(itemInfo.id, { transaction: t });

          if (equipment.amount < numberOfItemsToRent) {
            throw new Error(`No hay suficientes unidades (${equipment.amount}) de ${equipment.name} para generar el alquiler.`)
          }

          const cost = calculateCost(daysToRent, equipment.price, numberOfItemsToRent);
          totalInvoice += cost;

          const rent = await Rent.create(
            {
              cost,
              rentedQuantity: numberOfItemsToRent,
              days: daysToRent
            },
            { transaction: t });

          if (!rent) {
            throw new Error(`Ocurrió un problema al generar el alquiler de ${equipment.name}.`);
          }

          await equipment.decrement('amount', { by: numberOfItemsToRent, transaction: t });

          await rent.setEquipment(equipment, { transaction: t });
          await rent.setClient(client, { transaction: t });
          await rent.setInvoice(newInvoice, { transaction: t });

          rents.push(rent);
        }

        await newInvoice.addRents(rents, { transaction: t });
        await newInvoice.setClient(client, { transaction: t });
        newInvoice.creationDate = new Date()
        newInvoice.total = totalInvoice;
        await newInvoice.save({ transaction: t });
        factura = newInvoice

        return await Invoice.findAll(
          {
            include: [
              { model: Client },
              {
                model: Rent,
                include: [
                  {
                    model: Equipment,
                    through: { attributes: ['RentId', 'EquipmentId'] },
                  },
                ],
              },
            ],
          },
          { transaction: t }
        );
      });

      res.status(200).json({ allInvoices: facturas, factura });
    }

  } catch (error) {
    console.log(error)
    res.status(500).json(error.message);
  }
};

module.exports = postInvoice;