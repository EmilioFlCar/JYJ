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
          const { startDate, endDate, itemID, itemsToRent } = item;
          const equipment = await Equipment.findByPk(itemID, { transaction: t });

          if (equipment.amount < itemsToRent) {
            throw new Error(`No hay suficientes unidades (${equipment.amount}) de ${equipment.name} para generar el alquiler.`)
          }

          const cost = calculateCost(startDate, endDate, equipment.price, itemsToRent);
          totalInvoice += cost;

          const rent = await Rent.create(
            {
              startDate,
              endDate,
              cost,
              rentedQuantity: itemsToRent,
              days: calculateDays(startDate, endDate)
            },
            { transaction: t });

          if (!rent) {
            throw new Error(`Ocurrió un problema al generar el alquiler de ${equipment.name}.`);
          }

          await equipment.decrement('amount', { by: itemsToRent, transaction: t });

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

      res.status(200).json({allInvoices: facturas, factura});
    }

  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = postInvoice;