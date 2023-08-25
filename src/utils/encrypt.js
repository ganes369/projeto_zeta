const bcrypt = require('bcrypt');

class BcryptService {
    constructor(saltRounds = 10) {
        this.bcrypt = bcrypt;
        this.saltRounds = saltRounds;
    }

    async hash(password) {
        const hashedPassword = await this.bcrypt.hash(
            password,
            this.saltRounds
        );
        return hashedPassword;
    }

    async compare(inputPassword, hashedPassword) {
        const passwordMatch = await this.bcrypt.compare(
            inputPassword,
            hashedPassword
        );
        return passwordMatch;
    }
}

module.exports = BcryptService;
