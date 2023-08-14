const Book = require('../entities/book');
const BookRespository = require('../repositories/book_repositories');

class BookService {
  constructor(file) {
    this.book = new BookRespository(file);
  }

  async findBook(title) {
    const book = await this.book.findBook(title);
    console.log(book instanceof Book);
    // testando metodos do objeto book.subscribe()
    return book;
  }

  async allBook(title) {
    const book = await this.book.allBook(title);
    return book;
  }
}
module.exports = BookService;
