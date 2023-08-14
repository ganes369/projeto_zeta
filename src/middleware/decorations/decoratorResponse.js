const express = require('express');
const { deleteProp } = require('../../utils/hidePropertie');

function DecoratorResponse() {
    const oldRespose = express.response.json; // .toString()
    let token;
    express.response.json = function (...args) {
        token = args[0].token;
        args[0] = deleteProp(args[0], 'pass');
        return oldRespose.apply(this, args);
    };
}

module.exports = { DecoratorResponse };
