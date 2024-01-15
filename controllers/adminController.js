const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

const generateToken = (admin) => {
  return jwt.sign({ adminId: admin.id }, 'secret_key', { expiresIn: '1h' });
};

const adminController = {
  login: async (req, res) => {
    try {
      // Ensure that the Objection model is correctly bound to Knex
      const admin = await Admin.query().findById(1);
      res.json(admin);
    } catch (error) {
      console.error('Error during admin login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = adminController;
