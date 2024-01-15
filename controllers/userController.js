const User = require('../models/regular');

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.query().findById(id);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
