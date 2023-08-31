const express = require('express');

const {
    DecoratorLowerCase,
} = require('./middleware/decorations/decoratorLowerCase');

const enviarAcesso = require('./service/enviar_acesso');
const mailer = require('./service/email');

const { cadastrar, logar } = require('./routes/usuarios');
const { listar, listarId, cadastra } = require('./routes/livros');

const app = express();

app.use(express.json());
app.use(DecoratorLowerCase);

app.use('/usuario', cadastrar.router);
app.use('/usuario', logar.router);
app.use('/livro', listar.router);
app.use('/livro', listarId.router);
app.use('/livro', cadastra.router);

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
    // eventos:
     enviarAcesso.enviarAcesso(mailer);
});
