const { readFile } = require('fs/promises')
const JwtService = require('../middleware/jwt')

class UserRespository {
    constructor(file) {
        this.file = file
        this.jwt = new JwtService()
    }

    #deletePass(user,...args){
        const aux = user
        args.forEach(i=> Reflect.deleteProperty(aux, i))
        return aux
    }

    async getOne(itemId) {
        const content = JSON.parse(await readFile(this.file))
        if(!itemId) return this.#deletePass(content.find(({ id }) => id === itemId), 'pass', 'id')
        return this.#deletePass(content.find(({ id }) => id === itemId), 'pass', 'id')
    }

    create({email,pass, id, permission}){
        return {
            email, pass, id, jwt: this.jwt.sign({permission}, 'secret',  7200 )
        }
    }
}

module.exports = UserRespository;