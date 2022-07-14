
const express = require('express');
const path = require('path');

export const app = express();

app.use(express.static(path.join(__dirname, 'index.html')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// module.exports = app;