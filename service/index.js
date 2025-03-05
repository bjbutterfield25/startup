const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = [];
let comments = [];

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });