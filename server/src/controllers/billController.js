const Bill = require('../models/Bill');
const BillItem = require('../models/BillItem');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');
const sequelize = require('../models/index');
 
exports.createBill = async (req, res) => {
  const transaction = await sequelize.transaction();
 
  try {
    const { customerName, items } = req.body;
 
    // Create Bill
    const bill = await Bill.create(
      { customerName, totalAmount: 0 },
      { transaction }
    );
 
    let total = 0;
 
    for (let item of items) {
      const product = await Product.findByPk(item.productId);
 
      if (!product) {
        throw new Error("Product not found");
      }
 
      const inventory = await Inventory.findOne({
        where: { productId: item.productId }
      });
 
      if (!inventory || inventory.quantity < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }
 
      // Reduce inventory
      inventory.quantity -= item.quantity;
      await inventory.save({ transaction });
 
      // Create bill item
      await BillItem.create({
        billId: bill.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      }, { transaction });
 
      total += product.price * item.quantity;
    }
 
    bill.totalAmount = total;
    await bill.save({ transaction });
 
    await transaction.commit();
 
    res.status(201).json({
      message: "Bill created successfully",
      billId: bill.id,
      totalAmount: total
    });
 
  } catch (err) {
    await transaction.rollback();
    res.status(400).json({ error: err.message });
  }
};