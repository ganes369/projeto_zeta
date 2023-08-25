class LivroError extends Error {
    constructor(message, errorCode) {
        super();
        this.name = 'LivroError';
        this.errorCode = errorCode;
        this.message = message;
        this.date = new Date();
    }
}

module.exports = LivroError;
