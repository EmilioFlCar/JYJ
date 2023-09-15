const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Invoice', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        issueDate:{
            type: DataTypes.DATE
        },
        total:{
            type: DataTypes.INTEGER
        },
        state: {
            type: DataTypes.ENUM("PAID", "PENDING"),
            defaultValue: "PENDING"
        }

    },
    { timestamps: false })
}