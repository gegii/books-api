const express = require('express')
const { register, login } = require('../controllers/user.controller')

const {
  validateLogin,
  validateRegistration,
  handleValidationErrors,
} = require('../middleware/validate')

const router = express.Router()

router.post('/login', validateLogin, handleValidationErrors, login)
router.post('/register', validateRegistration, handleValidationErrors, register)

module.exports = router
