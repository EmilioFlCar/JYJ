require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const ClientModel = require('./models/Client')
const EquipmentModel = require('./models/Equipment');
const InvoiceModel = require('./models/Invoice');
const RentModel = require('./models/Rent');

const sequelize = new Sequelize(
`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/jyjdb`,
   { logging: false, native: false }
);

ClientModel(sequelize)
EquipmentModel(sequelize)
InvoiceModel(sequelize)
RentModel(sequelize)


const { Client, Equipment, Invoice, Rent } = sequelize.models;

Client.hasMany(Rent);
Rent.belongsTo(Client);

Client.hasMany(Invoice);
Invoice.belongsTo(Client);

Invoice.hasMany(Rent);
Rent.belongsTo(Invoice); // Relación entre Alquiler y Factura

Rent.belongsToMany(Equipment, { through: 'RentEquipment' });
Equipment.belongsToMany(Rent, { through: 'RentEquipment' });

module.exports = {
   Client,
   Equipment,
   Invoice,
   Rent,
   conn: sequelize,
};
