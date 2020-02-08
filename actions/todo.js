const todoValidator = require('../validators/todo').todoValidator,
    responseCode = require('http-status-codes'),
    objectId = require("mongodb").ObjectID;

class TodoAction {

    async add(req, res) {
        try {
            const validData = todoValidator.add(req.body);

            const collection = req.app.locals.dataBase.collection('todoList');

            await collection.insertOne(validData);

            res.send(validData);
        } catch (e) {
            res.sendStatus(responseCode.BAD_REQUEST);
        }
    }

    async delete(req, res) {
        try {
            const validId = todoValidator.delete(req.body),
                _id = objectId(validId);

            const collection = req.app.locals.dataBase.collection('todoList');

            const deletedTodo = await collection.findOneAndDelete({_id});

            res.send(deletedTodo.value);
        } catch (e) {
            res.sendStatus(responseCode.BAD_REQUEST);
        }
    }

    async update(req, res) {
        try {
            const validData = todoValidator.update(req.body),
                _id = objectId(req.body._id);

            const collection = req.app.locals.dataBase.collection('todoList');

            const deletedTodo = await collection
                .findOneAndUpdate(
                {_id},
                { $set: validData},
                {returnOriginal: false }
                );

            res.send(deletedTodo.value);
        } catch (e) {
            res.sendStatus(responseCode.BAD_REQUEST);
        }
    }

    async get(req, res) {
        try {
            const validId = todoValidator.get(req.body),
                _id = objectId(validId);

            const collection = req.app.locals.dataBase.collection('todoList');

            const todo = await collection.findOne({_id});

            res.send(todo);
        } catch (e) {
            const collection = req.app.locals.dataBase.collection('todoList');

            const todos = await collection.find({}).toArray();

            res.send(todos);
        }
    }
}

module.exports = {
    TodoAction,
    todoAction: new TodoAction(),
};
