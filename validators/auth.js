const ValidationError = require('../validator/ValidationError');
const _ = require('lodash');
const {AuthFields} = require('../models/auth');

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

        return _.pick(payload, AuthFields)
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

        return _.pick(payload, AuthFields)
    }

}

module.exports = {
    AuthValidator,
    authValidator: new AuthValidator(),
};
