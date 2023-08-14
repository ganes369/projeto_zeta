const UserError = require('../error/user');

class UserService {
    constructor(repository, jwt) {
        this.user = repository;
        this.jwt = jwt;
    }

    async login({ email, pass }) {
        const user = await this.user.login({ email, pass });
        if (!user) throw new UserError('wrong password or email ;(', 404);
        const jwt = this.jwt.sign(
            { id: user.id, permission: user.permission, email },
            7200
        );
        return { ...user, token: jwt };
    }
}
module.exports = UserService;
