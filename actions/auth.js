const {authValidator} = require('../validators/auth'),
    responseCode = require('http-status-codes'),
    {jwt} = require('../utils/jwt'),
    _ = require('lodash'),
    {User} = require('../models/user');

class AuthAction {

    async signUp(req, res) {
        try {
            const validData = authValidator.signUp(req.body);

            const collection = req.app.locals.dataBase.collection('users');

            await collection.insertOne(validData);

            const jwtToken = jwt.generateJwtById(validData._id);

            res.send(Object.assign(validData, {jwtToken}))
        } catch (e) {
            res.status(responseCode.BAD_REQUEST).send(e);
        }
    }

    async signIn(req, res) {
        try {
            const validData = authValidator.signIn(req.body);

            const collection = req.app.locals.dataBase.collection('users');

            const user = await collection.findOne(validData),
                jwtToken = jwt.generateJwtById(validData._id);

            const userToSend = Object.assign(user, {jwtToken});

            res.send(_.pick(userToSend, User));
        } catch (e) {
            res.status(responseCode.BAD_REQUEST).send(e);
        }
    }
}

module.exports = {
    AuthAction,
    authAction: new AuthAction(),
};
