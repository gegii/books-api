const { testDbConnection } = require('./db')
const { sequelize } = require('./db')
const app = require('./app')

const port = 3000 // no ENV for testing

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`)
  await testDbConnection()

  // delete db data and create tables on every app start
  await sequelize.sync({ force: true })
})
