const express = require('express');
const path = require('path');

const initHandlebars = require('./config/handlebars.js');

const app = express();

initHandlebars(app);

app.use(express.static(path.resolve('./src/static')));

app.all('/', (req, res) => {
    res.render('index');
});

app.listen(5000, console.log.bind(console, 'Server is running on http://localhost:5000'));