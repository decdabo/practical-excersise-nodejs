const path = require('path');
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const db = require("./database");

if (process.env.NODE_ENV === 'development') require('dotenv').config();

const app = express();
db();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use('/', require('./routes/pages'));
app.use('/game', require('./routes/games'));

module.exports = app;
