const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.getAllUsers = async (req, res) => {
  
  try {
    const users = await User.query()
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.query().findById(id)

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.createUser = async (req, res) => {
  const { username, password, email } = req.body

  try {
    const newUser = await User.query().insert({
      email,
      username,
      password,
    })
    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.query().findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' })
      res.json({ token })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const deletedUser = await User.deleteUserById(id)

    if (deletedUser === 1) {
      res.status(200).json({ message: 'User deleted successfully' })
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}