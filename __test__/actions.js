// helper functions only for tests

const app = require('../app')
const request = require('supertest')

// for simplicity
const generateRandomEmail = () => {
  const username = Math.random().toString(36).substring(2, 10)
  const domain = 'example.com'
  const email = `${username}@${domain}`
  return email
}

const registerUser = async (email, password) => {
  try {
    const singupResponse = await request(app)
      .post('/users/register')
      .send({ email, password })
    return singupResponse
  } catch (error) {
    console.log(error)
  }
}

const loginUser = async (email, password) => {
  try {
    const loginResponse = await request(app)
      .post('/users/login')
      .send({ email, password })
    return loginResponse
  } catch (error) {
    console.log(error)
  }
}

const createBook = async (bookData, token) => {
  try {
    const bookResponse = await request(app)
      .post('/books')
      .set('Authorization', token)
      .send({ ...bookData })
    return bookResponse.body
  } catch (error) {
    console.log(error)
  }
}

const getBook = async (bookId, token) => {
  try {
    const bookResponse = await request(app)
      .get(`/books/${bookId}`)
      .set('Authorization', token)
    return bookResponse
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  registerUser,
  generateRandomEmail,
  loginUser,
  createBook,
  getBook,
}
