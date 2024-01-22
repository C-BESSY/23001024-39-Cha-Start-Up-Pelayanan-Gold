const User = require('../models/user');

const checkUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id) {
      const user = await User.query().findById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.role === 'admin' && req.method !== 'GET') {
        return res.status(403).json({ error: 'Forbidden' });
      }
    }

    next();
  } catch (error) {
    console.error('Error checking user role:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  checkUserRole,
};
