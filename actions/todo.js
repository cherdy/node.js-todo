const todoValidator = require('../validators/todo').todoValidator,
    responseCode = require('http-status-codes'),
    objectId = require("mongodb").ObjectID;

class TodoAction {

    async add(req, res) {
        try {
            const validData = todoValidator.add(req.body);

            validData.userID = req.user._id;

            const collection = req.app.locals.dataBase.collection('todoList');

            await collection.insertOne(validData);

            res.send(validData);
        } catch (e) {
            res.status(responseCode.BAD_REQUEST).send(e);
        }
    }

    async delete(req, res) {
        try {
            const validId = todoValidator.delete(req.body),
                _id = objectId(validId),
                userID = req.user._id;

            const collection = req.app.locals.dataBase.collection('todoList');

            const deletedTodo = await collection.findOneAndDelete({_id, userID});

            res.send(deletedTodo.value);
        } catch (e) {
            res.status(responseCode.BAD_REQUEST).send(e);
        }
    }

    async update(req, res) {
        try {
            const validData = todoValidator.update(req.body),
                _id = objectId(req.body._id),
                userID = req.user._id;

            const collection = req.app.locals.dataBase.collection('todoList');

            const deletedTodo = await collection
                .findOneAndUpdate(
                {_id, userID},
                { $set: validData},
                {returnOriginal: false }
                );

            res.send(deletedTodo.value);
        } catch (e) {
            res.status(responseCode.BAD_REQUEST).send(e);
        }
    }

    async get(req, res) {
        try {
            const validId = todoValidator.get(req.body),
                _id = objectId(validId),
                userID = req.user._id;

            const collection = req.app.locals.dataBase.collection('todoList');

            const todo = await collection.findOne({_id, userID});

            res.send(todo);
        } catch (e) {
            const collection = req.app.locals.dataBase.collection('todoList'),
                userID = req.user._id;

            const todos = await collection.find({userID}).toArray();

            res.send(todos);
        }
    }
}

module.exports = {
    TodoAction,
    todoAction: new TodoAction(),
};
