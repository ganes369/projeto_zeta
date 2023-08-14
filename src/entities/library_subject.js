// Classe Subject (Assunto)
class LibrarySubject {
    constructor() {
        this.books = [];
        this.subscribers = [];
    }

    // Adicionar um novo inscrito (observador)
    subscribe(observer) {
        this.subscribers.push(observer);
    }

    // Remover um inscrito (observador)
    unsubscribe(observer) {
        this.subscribers = this.subscribers.filter(
            (subscriber) => subscriber !== observer
        );
    }

    // Notificar todos os inscritos sobre uma ação (neste caso, empréstimo de um livro)
    notify(action, book) {
        this.subscribers.forEach((subscriber) =>
            subscriber.update(action, book)
        );
    }

    // Simular a ação de empréstimo de um livro
    lendBook(book) {
        if (this.books.includes(book)) {
            this.books = this.books.filter((b) => b !== book);
            this.notify('emprestimo', book);
        } else {
            throw new Error('Livro não encontrado na biblioteca.');
        }
    }

    // Adicionar um novo livro à biblioteca
    addBook(book) {
        this.books.push(book);
    }
}

module.exports = LibrarySubject;
