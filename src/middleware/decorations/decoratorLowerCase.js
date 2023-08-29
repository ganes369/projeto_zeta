
function DecoratorLowerCase(req, res, next) {
    // Modificações na requisição antes de passá-la adiante
    if (req.body && typeof req.body === 'object') {
        for (const key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = 
                Reflect.has(req.body, 'email') || Reflect.has(req.body, 'senha') 
                ? req.body[key] :
                req.body[key].toLowerCase();
            }
        }
    }

    next(); // Chama o próximo middleware ou rota
}


module.exports = { DecoratorLowerCase }