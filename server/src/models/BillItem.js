const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Bill = require('./Bill');
const Product = require('./Product');
 
const BillItem = sequelize.define('BillItem', {
  quantity: { type: DataTypes.FLOAT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false } // price at time of sale
});
 
// Relations
BillItem.belongsTo(Bill, { foreignKey: 'billId' });
BillItem.belongsTo(Product, { foreignKey: 'productId' });
 
module.exports = BillItem;