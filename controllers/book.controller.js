const Book = require('../models/book.model')

const createBook = async (req, res) => {
  try {
    const { title, author, content } = req.body
    const userId = req.user.id

    const newBook = await Book.create(
      {
        title,
        author,
        content,
        userId,
      },
      { where: { userId } }
    )

    res.status(201).json(newBook)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Interal server error' })
  }
}

// all books or paginated
const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page)
    const pageSize = parseInt(req.query.pageSize)
    const userId = req.user.id

    if (page && pageSize) {
      const offset = (page - 1) * pageSize
      const books = await Book.findAndCountAll({
        where: { userId },
        limit: pageSize,
        offset,
      })
      const totalPages = Math.ceil(books.count / pageSize)

      res.status(200).json({
        books: books.rows,
        totalPages,
        currentPage: page,
        pageSize,
        totalCount: books.count,
      })
    } else {
      const allBooks = await Book.findAll({
        where: { userId },
      })

      res.status(200).json({
        books: allBooks,
        totalCount: allBooks.length,
      })
    }
  } catch (error) {
    res.status(500).json({ error: 'Interal server error' })
  }
}

// with whole or paginated content
const getBook = async (req, res) => {
  try {
    const book = req.book
    const { page, charactersCount } = req.query

    if (page && charactersCount) {
      const start = (page - 1) * charactersCount
      const end = start + parseInt(charactersCount)
      const paginatedContent = book.content.substring(start, end)
      const totalPages = Math.ceil(
        book.content.length / parseInt(charactersCount)
      )

      const paginatedBook = {
        ...book,
        content: paginatedContent,
        totalPages,
        currentPage: page,
        charactersCount: charactersCount,
      }

      res.status(200).json(paginatedBook)
    } else {
      res.status(200).json(book)
    }
  } catch (error) {
    res.status(500).json({ error: 'Interal server error' })
  }
}

const editBook = async (req, res) => {
  try {
    const { title, author, content, lastPageRead } = req.body
    const [numOfUpdatedRows, [updatedBook]] = await Book.update(
      { title, author, content, lastPageRead },
      { where: { id: req.book.id }, returning: true }
    )

    res.status(200).json(updatedBook)
  } catch (error) {
    res.status(500).json({ error: 'Interal server error' })
  }
}

const deleteBook = async (req, res) => {
  try {
    await Book.destroy({ where: { id: req.book.id } })
    res.status(200).json({ message: 'Book deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Interal server error' })
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBook,
  editBook,
  deleteBook,
}
