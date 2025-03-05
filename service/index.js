const express = require('express');
const app = express();
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const authCookieName = 'token';


const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = [];
let comments = [];

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });