const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
 
    const user = await User.findOne({ where: { email } });
 
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
 
    const isMatch = await bcrypt.compare(password, user.password);
 
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
 
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
 
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};