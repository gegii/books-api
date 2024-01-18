const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books API with Swagger',
      version: '0.1.0',
      description: 'Books API application made for crocobet',
    },
  },
  //   apis: ['./routes/*.js'],
  apis: ['./*.js'],
}

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Token authentication. Include the token in the Authorization header.
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *         content:
 *           type: string
 *           description: The book content
 *         lastPageRead:
 *           type: number
 *           description: The last page read
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the book was updated
 *         userId:
 *           type: number
 *           description: Owner user id in users table
 *     EditBookRequest:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - content
 *         - lastPageRead
 *       properties:
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *         content:
 *           type: string
 *           description: The book content
 *         lastPageRead:
 *           type: number
 *           description: The last page read
 *     CreateBookRequest:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *         content:
 *           type: string
 *           description: The book content
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: Users email address
 *         password:
 *           type: string
 *           description: Users hashed password
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was updated
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: pass token in "Authorization" header.
 * /books:
 *   get:
 *     summary: Lists all the books or paginated (with pageSize, currentPage, totalPages, totalCount)
 *     security:
 *       - BearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         required: false
 *         description: The page to fetch
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *         required: false
 *         description: Number of books to fetch on each page
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     books:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Book'
 *                     totalPages:
 *                       type: number
 *                       default: 4
 *                     currentPage:
 *                       type: number
 *                       default: 2
 *                     pageSize:
 *                       type: number
 *                       default: 1
 *                     totalCount:
 *                       type: number
 *                       default: 4
 *                 - type: object
 *                   properties:
 *                     books:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Book'
 *                     totalCount:
 *                       type: number
 *                       default: 1
 *       400:
 *        description: Bad request / validation
 *       401:
 *        description: Unauthorized / Invalid token
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookRequest'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *        description: Bad request / validation
 *       401:
 *        description: Unauthorized / Invalid token
 *       500:
 *         description: Internal server error
 * /books/{bookId}:
 *   get:
 *     summary: Get the book by id with full or paginated content (with charactersCount, currentPage, totalPages)
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: number
 *         required: true
 *         description: The book id
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         required: false
 *         description: The content page to fetch (book content split)
 *       - in: query
 *         name: charactersCount
 *         schema:
 *           type: number
 *         required: false
 *         description: Number of characters to fetch on each book page (book content split)
 *     responses:
 *       200:
 *         description: The book response by id
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     books:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Book'
 *                     totalPages:
 *                       type: number
 *                       default: 4
 *                     currentPage:
 *                       type: number
 *                       default: 2
 *                     charactersCount:
 *                       type: number
 *                       default: 50
 *                 - $ref: '#/components/schemas/Book'
 *       400:
 *        description: Bad request / validation
 *       401:
 *        description: Unauthorized / Invalid token
 *       403:
 *        description: Forbidden, You do not own this book
 *       404:
 *         description: The book was not found
 *       500:
 *         description: Internal server error
 *   patch:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: path
 *        name: bookId
 *        schema:
 *          type: number
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EditBookRequest'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      400:
 *        description: Bad request / validation
 *      401:
 *        description: Unauthorized / Invalid token
 *      403:
 *        description: Forbidden, You do not own this book
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Internal server error
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: number
 *         required: true
 *         description: The book id
 *     requestBody:
 *
 *     responses:
 *       200:
 *         description: Book deleted
 *       400:
 *        description: Bad request / validation
 *       401:
 *        description: Unauthorized / Invalid token
 *       403:
 *        description: Forbidden, You do not own this book
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 *   name: Users
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: Email to register.
 *                      example: "gegi@gmail.com"
 *                  password:
 *                      type: string
 *                      description: Create password (min 4).
 *                      example: "1111"
 *     responses:
 *       200:
 *         description: The user registered.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      description: A message indicating successful user registration.
 *                      example: "User registered!"
 *       400:
 *        description: Bad request / validation
 *       500:
 *         description: Internal server error
 * /users/login:
 *   post:
 *     summary: Login user and get token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: User email.
 *                      example: "gegi@gmail.com"
 *                  password:
 *                      type: string
 *                      description: User password (min 4).
 *                      example: "1111"
 *     responses:
 *       200:
 *         description: The user registered.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  token:
 *                      type: string
 *                      description: Generated token.
 *                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsnMb4"
 *                  userId:
 *                      type: string
 *                      description: User id.
 *                      example: "1"
 *       400:
 *        description: Bad request / validation
 *       500:
 *         description: Internal server error
 *
 */

module.exports = { swaggerOptions }
