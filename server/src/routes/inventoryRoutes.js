const express = require('express');
const router = express.Router();
const { addInventory, getInventory } = require('../controllers/inventoryController');
 
router.post('/', addInventory);
router.get('/', getInventory);
 
module.exports = router;