require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./models/index');

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

require('./models/User');
require('./models/Category');
require('./models/Product');
require('./models/Inventory');
require('./models/Bill');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware FIRST
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);

// Test route
app.get('/', (req, res) => {
    res.send({ message: `Welcome to ${process.env.SHOP_NAME} POS API!` });
});

// Sync DB
sequelize.sync({ alter: true })
    .then(() => console.log('Database & tables synced!'))
    .catch(err => console.log(err));

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});