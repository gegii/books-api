const { body, check, validationResult, param } = require('express-validator')

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const validateRegistration = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters'),
]

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
]

const validateCreateBook = [
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('author').isString().notEmpty().withMessage('Author is required'),
  body('content')
    .isString()
    .notEmpty()
    .withMessage('Content is requiered and should be a string'),
]

const validateEditBook = [
  body('title')
    .isString()
    .notEmpty()
    .withMessage('Title is required as string'),
  body('author')
    .isString()
    .notEmpty()
    .withMessage('Author is required as string'),
  body('content')
    .isString()
    .notEmpty()
    .withMessage('Content should be a string'),
  body('lastPageRead').notEmpty().withMessage('Last Page Read is required'),
  body('lastPageRead')
    .isInt({ min: 0 })
    .withMessage('Last Page Read should be a non-negative integer'),
  param('bookId')
    .isInt({ min: 1 })
    .withMessage('Invalid book ID. Must be a positive integer'),
]

const validateGetBook = [
  check('page').optional().isInt({ min: 1 }).withMessage('Invalid page number'),
  check('pageSize')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Invalid page size'),
  check('charactersCount')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Invalid characters count'),
  param('bookId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Invalid book ID. Must be a positive integer'),
]

const validateDeleteBook = [
  param('bookId')
    .isInt({ min: 1 })
    .withMessage('Invalid book ID. Must be a positive integer'),
]

module.exports = {
  validateCreateBook,
  validateEditBook,
  validateLogin,
  validateRegistration,
  validateGetBook,
  validateDeleteBook,
  handleValidationErrors,
}
