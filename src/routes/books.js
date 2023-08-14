const path = require('node:path');
const { permissionAdmin, permissionRead } = require('../middleware/permission');
const BookService = require('../service/book_service');
const BookError = require('../error/book');

class Books {
  constructor(router, jwt) {
    this.router = router;
    this.jwt = jwt;

    this.router.get('/emprestimo', this.jwt.verify, permissionAdmin, this.loan);
    this.router.get('/book', this.jwt.verify, permissionRead, this.findBook);
    this.router.get(
      '/listar/books',
      this.jwt.verify,
      permissionRead,
      this.allBook
    );
  }

  loan(req, res) {
    res.send('Página inicial');
  }

  async findBook(req, res) {
    try {
      const { title } = req.query;
      const book = await new BookService(
        path.resolve(__dirname, './../../database/books.json')
      ).findBook(title);
      return res.json(book);
    } catch (error) {
      console.log(error);
      const err = new BookError(error.message, error.errorCode || 500);
      return res
        .status(err.errorCode)
        .json(JSON.parse(JSON.stringify(err, null, 2)));
    }
  }

  async allBook(req, res) {
    try {
      const { title } = req.query;
      const book = await new BookService(
        path.resolve(__dirname, './../../database/books.json')
      ).allBook(title);
      return res.json(book);
    } catch (error) {
      console.log(error);
      const err = new BookError(error.message, error.errorCode || 500);
      return res
        .status(err.errorCode)
        .json(JSON.parse(JSON.stringify(err, null, 2)));
    }
  }
}

module.exports = Books;
