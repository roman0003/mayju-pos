const Product = require('../models/Product');
const Category = require('../models/Category');
 
exports.createProduct = async (req, res) => {
  try {
    const { name, sku, price, categoryId } = req.body;
    const product = await Product.create({ name, sku, price, categoryId });
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};