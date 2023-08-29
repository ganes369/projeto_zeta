const myEmitter = require('../emiters/emissor');
const mailer = require('./email');

class EnviarAcesso {
    enviarAcesso() {
        myEmitter.on('acessoUsuario', (data) => {
            mailer.sendMail(
                data.email,
                'Consta na livraria zeta',
                `SENHA: ${data.senhaAleatoria}`
            );
            // console.log('Evento ocorreu: o email foi disparado para', data.email,'com a senha',data.senhaAleatoria);
        });
    }
}
const enviarAcesso = new EnviarAcesso();
module.exports = enviarAcesso;
