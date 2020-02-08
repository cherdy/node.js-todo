const express = require('express'),
    app = express(),
    inject = require('require-all'),
    router = express.Router,
    bodyParser = require('body-parser'),
    MongoClient = require("mongodb").MongoClient;

const portServer = 3000,
    hostServer = '127.0.0.1';

const connectionDbUrl = 'mongodb://localhost:27017/',
    mongoClient = new MongoClient(connectionDbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function dbConnect() {
    return new Promise((resolve, reject) => {
        mongoClient.connect((err, client) => {
            if (err) reject(err);

            app.locals.dataBase = client.db("todo");

            resolve();
        });
    });
}

function runServer() {
    return new Promise((resolve, reject) => {
        app.listen(portServer, hostServer, (err) => {
            if (err) reject(err);

            resolve();
        });
    });
}

function initRouter() {
    try {
        const controllers = inject(__dirname + '/controllers');

        for (const name in controllers) {
            app.use(`/${name}`, controllers[name](router));
        }
    } catch (e) {
        console.log(e)
    }
}

async function init() {
    try {
        await dbConnect();
        initRouter();
        await runServer();
    } catch (e) {
        console.log(e);
    }
}

init();
