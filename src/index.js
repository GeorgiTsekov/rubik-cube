const express = require('express');
const path = require('path');

const initHandlebars = require('./config/handlebars.js');
const routes = require('./config/routes.js');

const app = express();

initHandlebars(app);

app.use(express.static(path.resolve('./src/static')));
app.use(routes);

app.listen(5000, console.log.bind(console, 'Server is running on http://localhost:5000'));