const JwtService = require('../../../src/middleware/jwt');

class JwtMock extends JwtService {
    sign(...args) {
        return 'token';
    }

    verify(...args) {
        return 'token';
    }
}

module.exports = JwtMock;
