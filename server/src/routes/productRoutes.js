const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productController');
const { verifyToken, isAdmin} = require('../middleware/authMiddleware');
 

router.post('/', verifyToken, isAdmin, createProduct);
router.get('/',verifyToken, getProducts);
router.post('/', createProduct);
router.get('/', getProducts);
 
module.exports = router;