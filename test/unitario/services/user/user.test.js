const path = require('node:path');
const UserBase = require('../../../../src/entities/user_base');
const JwtService = require('../../../../src/middleware/jwt');
const UserRespository = require('../../../../src/repositories/user_repository');
// { expect, describe, test, jest, beforeEach } = require('@jest/globals');
const UserService = require('../../../../src/service/user_service');

class JwtMock extends JwtService {
    sign(...args) {
        return 'token';
    }

    verify(...args) {
        return 'token';
    }
}

class RepositoryUserMock extends UserRespository {
    login(...args) {
        return new UserBase({
            id: 1,
            nick: 'admin',
            pass: '123',
            email: 'aras@gmail.com',
            permission: 63,
        });
    }

    findOneUser(...args) {
        return '';
    }
}

describe('UserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Deverá retornar usuario e token de login', async () => {
        const sigIn = new JwtMock('secret');
        const repository = new RepositoryUserMock(
            path.resolve(__dirname, './../../../mocks/dbuser.json')
        );
        const spy = jest.spyOn(sigIn, 'sign');

        const userInstance = await new UserService(repository, sigIn).login({
            email: 'aras@gmail.com',
            pass: '123',
        });

        expect(spy).toHaveBeenCalled();
        expect(userInstance).toEqual({
            id: 1,
            nick: 'admin',
            email: 'aras@gmail.com',
            pass: '123',
            permission: 63,
            token: 'token',
        });
    });

    test('Deverá retornar erro caso não encontre usuario', async () => {
        const sigIn = new JwtMock('secret');
        const repository = new RepositoryUserMock(
            path.resolve(__dirname, './../../../mocks/dbuser.json')
        );
        jest.spyOn(repository, 'login').mockResolvedValueOnce(null);

        const userInstance = new UserService(repository, sigIn).login({
            email: 'aras@gmail.com',
            pass: '123',
        });

        await expect(userInstance).rejects.toThrow(
            'wrong password or email ;('
        );
    });
});
