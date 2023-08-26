class Gerador {
    static geradorSenha() {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$&*/';
        const passwordLength = 8;

        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters.charAt(randomIndex);
        }
        console.log(password, '---------------------------------------');
        return password;
    }
}

module.exports = Gerador;
