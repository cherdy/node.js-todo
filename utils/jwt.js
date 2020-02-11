const {ObjectID} = require("mongodb"),
    jwt = require('jsonwebtoken');

const jwtTokenKey = '1a2b-3c4d-5e6f-7g8h';

class Jwt {

    checkAuth(req, res, next) {
        if(!req.headers.authorization) next();

        if(req.headers.authorization) {
            jwt.verify(req.headers.authorization, jwtTokenKey, async (err, payload) => {
                if(err || !payload) {
                    next();
                    return;
                }

                const collection = req.app.locals.dataBase.collection('users'),
                    _id = ObjectID(payload.id);

                req.user = await collection.findOne({_id});

                next();
            });
        }
    }

    generateJwtById(id) {
        return jwt.sign({id}, jwtTokenKey)
    }
}

module.exports = {
    Jwt,
    jwt: new Jwt,
};
