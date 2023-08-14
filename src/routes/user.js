const path = require('path');
const UserError = require('../error/user');
const {
  DecoratorResponse,
} = require('../middleware/decorations/decoratorResponse');
const {
  DecoratorHttpInterceptor,
} = require('../middleware/decorations/decoratorHttpInterceptor');
const UserService = require('../service/user_service');

DecoratorResponse();
DecoratorHttpInterceptor();
class User {
  constructor(router, jwt) {
    this.router = router;
    this.jwt = jwt;

    this.router.post('/login', this.login.bind(this));
  }

  async login(req, res) {
    try {
      const { email, pass } = req.body;
      const user = await new UserService(
        path.resolve(__dirname, './../../database/user.json'),
        this.jwt
      ).login({ email, pass });
      return res.json(user);
    } catch (error) {
      const err = new UserError(error.message, error.errorCode || 500);
      return res
        .status(err.errorCode)
        .json(JSON.parse(JSON.stringify(err, null, 2)));
    }
  }
}

module.exports = User;
