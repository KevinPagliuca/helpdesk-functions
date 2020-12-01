const express = require('express');

const routes = require('./routes');

const cors = require('cors');

const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3333);
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

module.exports = app;