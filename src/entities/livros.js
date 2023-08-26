class LivrosEntidade {
    constructor({ id, titulo, autor, generos, status, created, updated }) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.status = status;
        this.generos = generos;
        this.created = new Date(created);
        this.updated = new Date(updated);
    }

    capitalizeAfterSpace() {
         this.titulo = this.titulo.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
         this.autor = this.autor.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
         this.generos = this.generos.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
         this.status = this.status.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
         return this
    }
}

module.exports = LivrosEntidade;
