const express = require('express');
const path = require('path');
initDatabase = require('./config/database');
const cookieParser = require('cookie-parser');

const initHandlebars = require('./config/handlebars.js');
const routes = require('./config/routes.js');
const config = require('./config/config.json')[process.env.NODE_ENV];

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

initHandlebars(app);

app.use(express.static(path.resolve('./src/static')));
app.use(routes);

initDatabase(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, console.log.bind(console, `Server is running on http://localhost:${config.PORT}`));
    })
    .catch(err => {
        console.log('Application init failed: ', err);
    })
