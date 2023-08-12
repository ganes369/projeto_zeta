const UserError = require('../error/error');
const UserRespository = require('../repositories/user_repository');

class UserService {
  constructor(file) {
    this.user = new UserRespository(file);
  }

  async getOneUser(id) {
    try {
      const user = await this.user.getOne(id);
      return user;
    } catch (error) {
      console.log(error.message);
      return new UserError(error.message, '001');
    }
  }

  createUser({ email, pass, id, permission }, jwt) {
    try {
      const result = this.user.create({ email, pass, id, permission });
      const token = jwt.sign({ permission, email }, 7200);
      return { result, token };
    } catch (error) {
      return error;
    }
  }
}
module.exports = UserService;
