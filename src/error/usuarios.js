class UsuariosErro extends Error {
    constructor(message, errorCode) {
        super();
        this.name = 'UsuariosError';
        this.errorCode = errorCode;
        this.message = message;
        this.date = new Date();
    }
}

module.exports = UsuariosErro;
