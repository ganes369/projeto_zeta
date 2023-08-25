class UsuarioEntity {
    constructor({ id, nome, email, senha, permissao, created, updated }) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.permissao = permissao;
        this.created = new Date(created);
        this.updated = new Date(updated)
    }

    update(action, book) {
        console.log(
            `${this.nome} foi notificado sobre a ação: ${action} do livro "${book}".`
        );
        return `${this.nome} foi notificado sobre a ação: ${action} do livro "${book}".`;
    }
}

module.exports = UsuarioEntity;
