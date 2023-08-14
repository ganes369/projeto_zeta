const { readFile } = require('fs/promises');
const UserBase = require('../entities/user_base');

class UserRespository {
  constructor(file) {
    this.file = file;
  }

  async login({ email, pass }) {
    const content = JSON.parse(await readFile(this.file));
    const user = content.find(
      (item) => item.email === email && item.pass === pass
    );
    if (!user) return;
    return new UserBase(user);
  }
}

module.exports = UserRespository;
