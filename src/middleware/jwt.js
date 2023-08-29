/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

class JwtService {
    constructor() {
        this.jwt = jwt;
    }

    sign(...args) {
        const [payload, expire] = args;
        const token = this.jwt.sign(payload, process.env.SECRET, {
            expiresIn: expire,
        });

        return token;
    }

    verify(req, res, next) {
        const token = req.headers.authorization;
        if (!token)
            return res
                .status(401)
                .json({ auth: false, message: 'No token provided.' });

        jwt.verify(
            token.split(' ')[1],
            process.env.SECRET,
            function (err, decoded) {
                if (err)
                    return res.status(500).json({
                        auth: false,
                        message: 'Failed to authenticate token.',
                    });
                req.payload = decoded;
                next();
            }
        );
    }
}

module.exports = JwtService;
