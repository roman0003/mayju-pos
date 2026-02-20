const { DataTypes } = require('sequelize');
const sequelize = require('./index');
 
const Bill = sequelize.define('Bill', {
  customerName: { type: DataTypes.STRING },
  totalAmount: { type: DataTypes.FLOAT, defaultValue: 0 }
});
 
module.exports = Bill;
// Relations

 
