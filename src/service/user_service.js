const UserError = require('../error/user');

class UserService {
    constructor(repository, jwt, bcrypt) {
        this.user = repository;
        this.jwt = jwt;
        this.bcrypt =bcrypt;
    }

    async login({ email, senha }) {
        const user = await this.user.login({ email });
        if (!user) throw new UserError('wrong password or email ;(', 404);

        const isMatch = await this.bcrypt.compare(senha, user.senha);

        if(!isMatch) throw new UserError('wrong password or email ;(', '404');

        const jwt = this.jwt.sign(
            { id: user.id, permission: user.permission, email },
            7200
        );
        return { ...user, token: jwt };
    }

    async cadastrar({ nome, email, senha, permissao }){
        const hash = await this.bcrypt.hash(senha);
        return await this.user.cadastrar({ nome, email, senha: hash, permissao });
    }
}
module.exports = UserService;
