const BookSubject = require('../entities/library_subject');
const BookError = require('../error/book');
const UserError = require('../error/user');

class BookService {
    constructor(repository) {
        this.book = repository;
    }

    async findBook(title) {
        const book = await this.book.findBook(title);
        // console.log(book instanceof Book);
        // testando metodos do objeto book.subscribe()
        return book;
    }

    async allBook(title) {
        const book = await this.book.allBook(title);
        return book;
    }

    async loanBook(req, userRepository) {
        const { id: adminId } = req.payload;
        const { id: userId, idbook } = req.body;

        const admin = await userRepository.findOneUser(adminId);
        if (!admin) throw new UserError('User not found ;(', 404);

        const user = await userRepository.findOneUser(userId);
        if (!user) throw new UserError('User not found ;(', 404);

        const book = await this.book.findBookId(idbook);

        if (!book) throw new BookError('The book not found ;(', 404);
        // console.log(book)
        // Criar instâncias da biblioteca e observadores
        const library = new BookSubject();

        // Inscrever os observadores na biblioteca
        library.subscribe(admin);
        library.subscribe(user);

        // Adicionar alguns livros à biblioteca
        library.addBook(book.title);

        // Remove inscrito
        // library.unsubscribe(user1);
        // Realizar um empréstimo de livro

        library.lendBook(book.title);

        return 'ok';
    }
}
module.exports = BookService;
