const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
 
exports.addInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const inventory = await Inventory.create({ productId, quantity });
    res.status(201).json({ message: "Inventory updated", inventory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll({ include: Product });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};