const express = require('express'),
    app = express(),
    inject = require('require-all'),
    router = express.Router,
    bodyParser = require('body-parser');

const port = 3000,
    host = '127.0.0.1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

try {
    const controllers = inject(__dirname + '/controllers');

    for (const name in controllers) {
        app.use(`/${name}`, controllers[name](router))
    }

} catch (e) {
    console.log(e)
}

app.listen(port, () => {
    console.log('app listening')
});
