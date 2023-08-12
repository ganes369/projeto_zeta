const { readFile } = require('fs/promises');

class UserRespository {
  constructor(file) {
    this.file = file;
  }

  async getOne(itemId) {
    const content = JSON.parse(await readFile(this.file));
    if (!itemId) return 'not found :(';
    return content.find(({ id }) => id === itemId);
  }

  create({ email, pass, id, permission }) {
    return {
      email,
      pass,
      id,
      permission,
    };
  }
}

module.exports = UserRespository;
