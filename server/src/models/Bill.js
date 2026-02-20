const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Product = require('./Product');
 
const Bill = sequelize.define('Bill', {
  customerName: { type: DataTypes.STRING, allowNull: false },
  totalAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
});
 
// Relations
Bill.belongsTo(Product, { foreignKey: 'productId' });
 
module.exports = Bill;