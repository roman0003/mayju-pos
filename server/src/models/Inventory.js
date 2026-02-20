const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Product = require('./Product');
 
const Inventory = sequelize.define('Inventory', {
  quantity: { type: DataTypes.FLOAT, defaultValue: 0 }
});
 
// Relations
Inventory.belongsTo(Product, { foreignKey: 'productId' });
 
module.exports = Inventory;