class BookError extends Error {
    constructor(message, errorCode) {
        super();
        this.name = 'BookError';
        this.errorCode = errorCode;
        this.message = message;
        this.date = new Date();
    }
}

module.exports = BookError;
