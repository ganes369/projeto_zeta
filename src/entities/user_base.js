class UserBase {
    constructor({ id, nick, email, pass, permission }) {
        this.id = id;
        this.nick = nick;
        this.email = email;
        this.pass = pass;
        this.permission = permission;
    }

    update(action, book) {
        console.log(
            `${this.nick} foi notificado sobre a ação: ${action} do livro "${book}".`
        );
        return `${this.nick} foi notificado sobre a ação: ${action} do livro "${book}".`;
    }
}

module.exports = UserBase;
