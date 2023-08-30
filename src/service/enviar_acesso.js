const myEmitter = require('../emiters/emissor');

class EnviarAcesso {
    enviarAcesso(mailer) {
        myEmitter.on('acessoUsuario', (data) => {
            mailer.sendMail(data);
        });
    }
}
const enviarAcesso = new EnviarAcesso();
module.exports = enviarAcesso;
