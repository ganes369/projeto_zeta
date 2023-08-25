class Livros {
    constructor({ id, titulo, autor, generos, status, created, updated }) {
        (this.id = id),
            (this.titulo = titulo),
            (this.autor = autor),
            (this.status = status);
        this.generos = generos;
        this.created = created;
        this.updated = updated;
    }
}

module.exports = Livros;
