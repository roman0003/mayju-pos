const User = require('../models/User');
const bcrypt = require('bcrypt');
 
// Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });
 
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
// List all Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};