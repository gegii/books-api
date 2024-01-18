const express = require('express')
const userRouter = require('./routes/user.route')
const bookRouter = require('./routes/book.route')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { swaggerOptions } = require('./swagger')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRouter)
app.use('/books', bookRouter)

const specs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

module.exports = app
