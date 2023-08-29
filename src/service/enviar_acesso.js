const myEmitter = require("../emiters/emissor");

class EnviarAcesso {
    enviarAcesso (){
        myEmitter.on("userRegistered", (data) => {
            console.log('Evento ocorreu: o email foi disparado para', data.email,'com a senha',data.senhaAleatoria);
        });
    }
}
const enviarAcesso = new EnviarAcesso()
module.exports = enviarAcesso