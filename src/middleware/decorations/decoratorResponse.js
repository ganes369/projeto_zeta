const express = require('express');
const { deleteProp } = require('../../utils/hidePropertie');

function DecoratorResponse() {
    const oldRespose = express.response.json; // .toString()
    express.response.json = function (...args) {
        token = args[0].token;
        args[0] = deleteProp(args[0], 'senha');
        return oldRespose.apply(this, args);
    };
}

module.exports = { DecoratorResponse };
