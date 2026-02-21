const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const BillItem = sequelize.define('BillItem', {
  quantity: { type: DataTypes.FLOAT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false } // price at time of sale
});

module.exports = BillItem;