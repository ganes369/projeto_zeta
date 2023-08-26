const BcryptService = require("../../../src/utils/encrypt");

class MockEncrypt extends BcryptService {
    hash(...args) {
        return 'hash';
    }

    compare(...args) {
        return 'hash';
    }
}

module.exports = MockEncrypt