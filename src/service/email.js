const nodemailer = require('nodemailer');

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

    async sendMail(to, subject, text) {
        const mailOptions = {
            from: 'aras.strong8@gmail.com', // Seu endereço de e-mail
            to,
            subject,
            text,
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Erro ao enviar e-mail:', error);
            } else {
                console.log(
                    'E-mail enviado com sucesso! Informações:',
                    info.response
                );
            }
        });
    }
}

const mailer = new Mailer();

module.exports = mailer;
