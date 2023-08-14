class Book {
  constructor({ id, title, autor, generos }) {
    (this.id = id), (this.title = title), (this.autor = autor);
    this.generos = generos ?? [];
  }

  subscribe(observer) {
    this.subscribers.push(observer);
  }
}

module.exports = Book;
