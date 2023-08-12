const jwt = require('jsonwebtoken')

class JwtService {
    constructor(){}

    sign(...args) {
        const [ payload, expire ] = args
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: expire })
    
        return token
    };

    verify(req, res, next){
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token.split(' ')[1], 'secret', function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        req.permission = decoded.permission;
        next();
        });
    }
}

module.exports = JwtService