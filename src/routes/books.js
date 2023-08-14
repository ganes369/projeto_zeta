const path = require('node:path');
const { permissionAdmin, permissionRead } = require('../middleware/permission');
const BookService = require('../service/book_service');
const BookError = require('../error/book');
const UserRespository = require('../repositories/user_repository');
const BookRespository = require('../repositories/book_repositories');

class Books {
    constructor(router, jwt) {
        this.router = router;
        this.jwt = jwt;
        this.router.post(
            '/emprestimo',
            this.jwt.verify,
            permissionAdmin,
            this.loan
        );
        this.router.get(
            '/book',
            this.jwt.verify,
            permissionRead,
            this.findBook
        );
        this.router.get(
            '/listar/books',
            this.jwt.verify,
            permissionRead,
            this.allBook
        );
    }

    async loan(req, res) {
        try {
            const result = await new BookService(
                new BookRespository(
                    path.resolve(__dirname, './../../database/books.json')
                )
            ).loanBook(
                req,
                new UserRespository(
                    path.resolve(__dirname, './../../database/user.json')
                )
            );
            res.json({ result });
        } catch (error) {
            const err = new BookError(error.message, error.errorCode || 500);
            return res
                .status(err.errorCode)
                .json(JSON.parse(JSON.stringify(err, null, 2)));
        }
    }

    async findBook(req, res) {
        try {
            const { title } = req.query;
            const book = await new BookService(
                new BookRespository(
                    path.resolve(__dirname, './../../database/books.json')
                )
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
                new BookRespository(
                    path.resolve(__dirname, './../../database/books.json')
                )
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
