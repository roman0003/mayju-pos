const Bill = require('../models/Bill');
const BillItem = require('../models/BillItem');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');
const sequelize = require('../models/index');
const { Op } = require('sequelize');


// =======================
// CREATE BILL
// =======================
exports.createBill = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { customerName, items } = req.body;

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

      inventory.quantity -= item.quantity;
      await inventory.save({ transaction });

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


// =======================
// GET ALL BILLS
// =======================
exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// =======================
// GET BILL BY ID
// =======================
exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findByPk(req.params.id, {
      include: [
        {
          model: BillItem,
          include: [Product]
        }
      ]
    });

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.json(bill);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// =======================
// TOTAL REVENUE
// =======================
exports.getTotalRevenue = async (req, res) => {
  try {
    const bills = await Bill.findAll();

    const total = bills.reduce((sum, bill) => {
      return sum + bill.totalAmount;
    }, 0);

    res.json({ totalRevenue: total });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// =======================
// TODAY REVENUE
// =======================
exports.getTodayRevenue = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bills = await Bill.findAll({
      where: {
        createdAt: {
          [Op.gte]: today
        }
      }
    });

    const total = bills.reduce((sum, bill) => {
      return sum + bill.totalAmount;
    }, 0);

    res.json({ todayRevenue: total });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};