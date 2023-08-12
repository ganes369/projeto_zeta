class UserError extends Error {
  constructor(message, errorCode) {
    super();
    this.name = 'UserError'; // Nome da classe de erro
    this.errorCode = errorCode; // Propriedade personalizada para o código de erro
    this.message = message;
    this.date = new Date(); // Por exemplo, você pode adicionar um carimbo de data/hora
  }
}

module.exports = UserError;
