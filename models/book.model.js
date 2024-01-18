const { sequelize } = require('../db')
const { DataTypes } = require('sequelize')
const User = require('./user.model')

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastPageRead: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})

Book.belongsTo(User, { foreignKey: 'userId' })

module.exports = Book
