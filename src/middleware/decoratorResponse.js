const express = require('express');

function deleteProp(user, ...args) {
  const aux = user;
  if (aux instanceof Array) {
    aux?.forEach((userItem) => {
      args.forEach((i) => Reflect.deleteProperty(userItem, i));
    });
  }
  if (user) {
    args?.forEach((i) => Reflect.deleteProperty(aux, i));
  }
  return aux;
}

function decoratorResponse() {
  const oldRespose = express.response.json; // .toString()

  express.response.json = function (...args) {
    args[0] = deleteProp(args[0], 'pass');

    return oldRespose.apply(this, args);
  };
}

module.exports = { decoratorResponse };
