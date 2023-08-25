const express = require('express');
const { deleteProp } = require('../../utils/hidePropertie');

function DecoratorResponse() {
    const oldRespose = express.response.json; // .toString()

    function removerPropriedades(...args) {
        args[0] = deleteProp(args[0], 'senha');
        return oldRespose.apply(this, args);
    }
    express.response.json = removerPropriedades;
}

module.exports = { DecoratorResponse };
