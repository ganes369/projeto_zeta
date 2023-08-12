class UserError extends Error {
    constructor(message, errorCode) {
      super(message);
      this.name = 'UserError'; // Nome da classe de erro
      this.errorCode = errorCode; // Propriedade personalizada para o código de erro
      this.date = new Date(); // Por exemplo, você pode adicionar um carimbo de data/hora
    }
}

  
module.exports = UserError