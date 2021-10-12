const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('./config/routes.js');
const config = require('./config/config.json')[process.env.NODE_ENV];
const initDatabase = require('./config/database');
const initHandlebars = require('./config/handlebars.js');
const { auth } = require('./middlewares/authMiddleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(auth);
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
