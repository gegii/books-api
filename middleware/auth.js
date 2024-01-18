const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const Book = require('../models/book.model')

const authorizeUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const verifiedToken = jwt.verify(token, 'CROCOBET') // no ENV for testing

    const user = await User.findOne({
      where: { id: verifiedToken.userId },
      raw: true,
    })

    if (!user) {
      // handle token passed before app was restarted
      // only needed because db data is refreshed for testing (on app restart)
      return res.status(401).json({ message: 'User not found' })
    }
    req.user = user

    next()
  } catch (error) {
    console.log(error)
    if (error.message == 'invalid signature' || 'invalid token') {
      return res.status(401).json({ message: 'Invalid token' })
    }
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const checkOwnership = async (req, res, next) => {
  try {
    const bookId = req.params.bookId
    const book = await Book.findOne({ where: { id: bookId }, raw: true })
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }

    // Check if the authenticated user owns the book
    if (book.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: 'Forbidden: You do not own this book' })
    }

    req.book = book
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { authorizeUser, checkOwnership }
