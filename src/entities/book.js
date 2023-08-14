class Book {
    constructor({ id, title, autor, generos, status }) {
        (this.id = id),
            (this.title = title),
            (this.autor = autor),
            (this.status = status);
        this.generos = generos ?? [];
    }
}

module.exports = Book;
