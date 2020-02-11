const ValidationError = require('../validator/ValidationError');
const _ = require('lodash');
const {TodoFields} = require('../models/todo');

class TodoValidator {

    add(payload) {
        if(!payload) {
            throw ValidationError('payload', "'payload' is required");
        }

        if(!payload.name) {
            throw ValidationError('name', "'name' is required");
        }

        if(!payload.description) {
            throw ValidationError('description', "'description' is required");
        }

        return _.pick(payload, TodoFields);
    }

    delete(payload) {
        if(!payload) {
            throw ValidationError('payload', "'payload' is required");
        }

        if(!payload._id) {
            throw ValidationError('_id', "'_id' is required");
        }

        return payload._id;
    }

    update(payload) {
        if(!payload.payload) {
            throw ValidationError('payload', "'payload' is required");
        }

        if(!payload._id) {
            throw ValidationError('_id', '"_id" is required');
        }

        return _.pick(payload.payload, TodoFields);
    }

    get(payload) {
        if(!payload) {
            throw ValidationError('payload', "'payload' is required");
        }

        if(!payload._id) {
            throw ValidationError('_id', '"_id" is required');
        }

        return payload._id;
    }

}

module.exports = {
    TodoValidator,
    todoValidator: new TodoValidator(),
};
