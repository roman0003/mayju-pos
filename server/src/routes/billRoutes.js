const express = require('express');
const router = express.Router();
const { createBill } = require('../controllers/billController');
const { verifyToken } = require('../middleware/authMiddleware');
 
router.post('/', verifyToken, createBill);
 
module.exports = router;