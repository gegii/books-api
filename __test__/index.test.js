const {
  registerUser,
  generateRandomEmail,
  loginUser,
  createBook,
  getBook,
} = require('./actions')

// check registration and login
describe('authentication', () => {
  it('returns successful registration and login', async () => {
    const email = generateRandomEmail()
    const singupResponse = await registerUser(email, '0000')
    expect(singupResponse.statusCode).toEqual(200)
    const loginResponse = await loginUser(email, '0000')
    expect(loginResponse.statusCode).toEqual(200)
  })

  it('returns user not found with wrong creds', async () => {
    const loginResponse = await loginUser(
      'no.user@notgmail.com',
      'user not exists'
    )
    expect(loginResponse.body.message).toEqual('No such user')
  })
})

// for registration and login
// book routes are validated too but not creating tests to keep it simple
describe('data validation', () => {
  it('returns bad request if data not valid during signup', async () => {
    const singupResponse = await registerUser('not valid email', '0')
    expect(singupResponse.statusCode).toEqual(400)
  })
  it('returns bad request if data not valid during login', async () => {
    const loginResponse = await loginUser('not valid email', '0')
    expect(loginResponse.statusCode).toEqual(400)
  })
})

// README
// We create users on every test run because
// we do NOT have consistent test users (db resets on every app restart)
// due to this constraint, not creating many and separated tests
describe('books API and permissions', () => {
  const generateUser = async () => {
    const email = generateRandomEmail()
    await registerUser(email, '0000')
    const loginResponse = await loginUser(email, '0000')
    return loginResponse.body
  }

  it('checks if user successfully creates book', async () => {
    const { token } = await generateUser()
    const bookData = {
      title: 'komble',
      author: 'me',
      content: 'it was and was not what',
    }
    await createBook(bookData, token)
  })

  it('checks ownership permissions and reading book data', async () => {
    const user1 = await generateUser()
    const user2 = await generateUser()

    const redHatBookData = {
      title: 'redhat',
      author: 'me',
      content: 'has red had',
    }

    const redHatBook = await createBook(redHatBookData, user1.token)

    // check get book with owner
    const bookResponse = await getBook(redHatBook.id, user1.token)
    expect(bookResponse.statusCode).toEqual(200)

    // check permissions for other users book
    const unAuthorizedBookResponse = await getBook(redHatBook.id, user2.token)
    expect(unAuthorizedBookResponse.statusCode).toEqual(403)
  })
})
