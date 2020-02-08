const responseCode = require('http-status-codes');

module.exports.userRequired = function (req, res, next) {
    const message = 'Auth required';
    if(!req.user) res.status(responseCode.BAD_REQUEST).send({message});

    next();
};
