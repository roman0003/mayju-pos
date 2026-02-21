const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Inventory = require('./Inventory');
const Bill = require('./Bill');
const BillItem = require('./BillItem');

// Category → Product
Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Product → Inventory
Product.hasOne(Inventory, { foreignKey: 'productId', onDelete: 'CASCADE' });
Inventory.belongsTo(Product, { foreignKey: 'productId' });

// Bill → BillItem
Bill.hasMany(BillItem, { foreignKey: 'billId', onDelete: 'CASCADE' });
BillItem.belongsTo(Bill, { foreignKey: 'billId' });

// Product → BillItem
Product.hasMany(BillItem, { foreignKey: 'productId' });
BillItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  User,
  Category,
  Product,
  Inventory,
  Bill,
  BillItem
};