const express = require('express');
const router = express.Router();

const {
  createBill,
  getBills,
  getBillById,
  getTotalRevenue,
  getTodayRevenue
} = require('../controllers/billController');

const { verifyToken } = require('../middleware/authMiddleware');

// Create Bill
router.post('/', verifyToken, createBill);

// Get all bills
router.get('/', verifyToken, getBills);

// Get total revenue
router.get('/revenue', verifyToken, getTotalRevenue);

// Get today's revenue
router.get('/revenue/today', verifyToken, getTodayRevenue);

// Get bill by ID
router.get('/:id', verifyToken, getBillById);

module.exports = router;