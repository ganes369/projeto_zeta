const { readFile } = require('fs/promises');
const Book = require('../entities/book');

class BookRespository {
    constructor(file) {
        this.file = file;
    }

    async findBook(title) {
        const content = JSON.parse(await readFile(this.file));
        const book = content.find((item) => {
            return (
                String(item.title).toUpperCase() ===
                    String(title).toUpperCase() && item
            );
        });
        if (!book) return content;
        return new Book(book);
    }

    async findBookId(id) {
        const content = JSON.parse(await readFile(this.file));
        const book = content.find((item) => +item.id === +id);

        if (!book) return null;
        return new Book(book);
    }

    async allBook() {
        const content = JSON.parse(await readFile(this.file));
        return content.map((item) => new Book(item));
    }
}

module.exports = BookRespository;
