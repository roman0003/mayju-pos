const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Category = require('./Category');
 
const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  sku: { type: DataTypes.STRING, unique: true },
  price: { type: DataTypes.FLOAT, allowNull: false }
});
 
// Relations
Product.belongsTo(Category, { foreignKey: 'categoryId' });
 
module.exports = Product;