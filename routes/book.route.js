const express = require('express')
const {
  createBook,
  getAllBooks,
  getBook,
  editBook,
  deleteBook,
} = require('../controllers/book.controller')

const { authorizeUser, checkOwnership } = require('../middleware/auth')
const {
  validateCreateBook,
  validateEditBook,
  validateGetBook,
  validateDeleteBook,
  handleValidationErrors,
} = require('../middleware/validate')

const router = express.Router()

router.post(
  '/',
  authorizeUser,
  validateCreateBook,
  handleValidationErrors,
  createBook
)
router.get(
  '/', // or "?page=3&pageSize=10"
  authorizeUser,
  validateGetBook,
  handleValidationErrors,
  getAllBooks
)
router.get(
  '/:bookId', // or "?page=7&charactersCount=50"
  authorizeUser,
  validateGetBook,
  handleValidationErrors,
  checkOwnership,
  getBook
)
router.patch(
  '/:bookId',
  authorizeUser,
  validateEditBook,
  handleValidationErrors,
  checkOwnership,
  editBook
)
router.delete(
  '/:bookId',
  authorizeUser,
  validateDeleteBook,
  handleValidationErrors,
  checkOwnership,
  deleteBook
)

module.exports = router
