const express = require('express');
const path = require('path');

const initHandlebars = require('./config/handlebars.js');
const routes = require('./config/routes.js');
const config = require('./config/config.json')[process.env.NODE_ENV];

const app = express();

app.use(express.urlencoded({extended: true}));

initHandlebars(app);

app.use(express.static(path.resolve('./src/static')));
app.use(routes);

app.listen(config.PORT, console.log.bind(console, `Server is running on http://localhost:${config.PORT}`));