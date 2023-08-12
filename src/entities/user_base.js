class UserBase {
  constructor({ id, nick, email, pass, permission }) {
    this.id = id;
    this.nick = nick;
    this.email = email;
    this.pass = pass;
    this.permission = permission;
  }
}

module.exports = UserBase;
