class LivroError extends Error {
    constructor(message, errorCode) {
        super();
        this.name = 'LivrosError';
        this.errorCode = errorCode;
        this.message = message;
        this.date = new Date();
    }
}

module.exports = LivroError;
