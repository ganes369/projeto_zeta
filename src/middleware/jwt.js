const jwt = require('jsonwebtoken')

class JwtService {
    constructor(){}

    hasPermission(userPermissions, requiredPermission) {
        return (userPermissions & requiredPermission) !== 0;
    };

    sign(...args) {
        const [ payload, secret, expire ] = args
        const token = jwt.sign(payload, secret, { expiresIn: expire })
    
        return token
    };

    verify(req, res, next){
        const token = req.headers.authorization;
        //console.log(req.headers.authorization)
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token.split(' ')[1], 'secret', function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        
        // se tudo estiver ok, salva no request para uso posterior
        req.permission = decoded.permission;
        next();
        });
    }
}

module.exports = JwtService