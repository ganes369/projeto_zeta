const express = require('express');
const { deleteProp } = require('../../utils/hidePropertie');

async function DecoratorHttpInterceptor() {
  const oldRespose = express.response.json; // .toString()

  express.response.json = function (...args) {
    const oldEmit = express?.response.setHeader; // .toString()
    if (args[0].token) {
      oldEmit.apply(this, ['token', args[0].token]);
      args[0] = deleteProp(args[0], 'token');
    }

    return oldRespose.apply(this, args);
  };
}

module.exports = { DecoratorHttpInterceptor };

/**
 * Em JavaScript, objetos de erro (incluindo erros lançados com throw) não são diretamente serializáveis em JSON usando o método JSON.stringify().
 * Isso ocorre porque a serialização JSON padrão não inclui informações detalhadas sobre o objeto de erro, como pilha de chamadas e outros detalhes
 * importantes.
 * No entanto, você pode converter manualmente um erro em um formato JSON que inclua informações relevantes, como a mensagem de erro
 *
 * JSON.stringify(args, null, 2)
 */
