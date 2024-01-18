const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { email, password } = req.body

  try {
    // check if user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'email already exists' })
    }

    // hash password for db
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userInfo = { email, password: hashedPassword }
    const user = await User.create({ ...userInfo })

    res.status(200).json({ message: `user ${user.email} registered!` })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'No such user' })
    }

    // check password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    // generate token for authorization
    const token = jwt.sign(
      { userId: user.id },
      'CROCOBET', // no ENV for testing
      {
        expiresIn: '24h',
      }
    )

    res.status(200).json({ token, userId: user.id })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  register,
  login,
}
