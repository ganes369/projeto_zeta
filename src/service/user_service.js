const UserError = require('../error/user');
const UserRespository = require('../repositories/user_repository');

class UserService {
  constructor(file, jwt) {
    this.user = new UserRespository(file);
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
