const ValidationError = require('../validator/ValidationError');
const _ = require('lodash');
authFields = [
    'login',
    'password',
    'name',
    '_id'
];

class AuthValidator {

    signUp(payload) {
        if (!payload) {
            throw ValidationError('payload', "'payload' is required");
        }

        if (!payload.login) {
            throw ValidationError('login', "'login' is required");
        }

        if (!payload.password) {
            throw ValidationError('password', "'password' is required");
        }

        if (!payload.name) {
            throw ValidationError('name', "'name' is required");
        }

        return _.pick(payload, authFields)
    }

    signIn(payload) {
        if (!payload) {
            throw ValidationError('payload', "'payload' is required");
        }

        if (!payload.login) {
            throw ValidationError('login', "'login' is required");
        }

        if (!payload.password) {
            throw ValidationError('password', "'password' is required");
        }

        return _.pick(payload, authFields)
    }

}

module.exports = {
    AuthValidator,
    authValidator: new AuthValidator(),
};
