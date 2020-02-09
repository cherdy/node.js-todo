const express = require('express'),
    app = express(),
    inject = require('require-all'),
    router = express.Router,
    bodyParser = require('body-parser'),
    MongoClient = require("mongodb").MongoClient,
    jwt = require('./utils/jwt').jwt;


const portServer = 3000,
    hostServer = '127.0.0.1';

const connectionDbUrl = 'mongodb://localhost:27017/',
    mongoClient = new MongoClient(connectionDbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(jwt.checkAuth);

async function runServer() {
    try {
        const client = await mongoClient.connect();
        app.locals.dataBase = client.db('todo');

        const controllers = inject(__dirname + '/controllers');

        for (const name in controllers) {
            app.use(`/${name}`, controllers[name](router));
        }

        app.listen(portServer, hostServer);
    } catch (e) {
        console.log(e);
    }
}

runServer();
