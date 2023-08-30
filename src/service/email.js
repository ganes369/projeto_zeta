const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');

class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.HOST_SMTP,
            port: Number(process.env.PORT_SMTP),
            tls: true,
            auth: {
                user: process.env.USER_SMTP, // Seu endereço de e-mail
                pass: process.env.PASS_SMTP, // Sua senha de e-mail
            },
        });
    }

    async sendMail({ senhaAleatoria, email, nome, subject, templatePath }) {
        try {
            const renderedTemplate = await ejs.renderFile(
                path.join(__dirname, templatePath),
                { senhaAleatoria, nome, email }
            );

            const mailOptions = {
                from: 'aras.strong8@gmail.com',
                to: email,
                subject,
                html: renderedTemplate,
            };

            const info = await this.transporter.sendMail(mailOptions);

            console.log(
                'E-mail enviado com sucesso! Informações:',
                info.response
            );
        } catch (error) {
            console.log('Erro ao enviar e-mail:', error);
        }
    }
}

const mailer = new Mailer();

module.exports = mailer;
