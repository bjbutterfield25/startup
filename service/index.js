const express = require('express');
const app = express();
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const authCookieName = 'token';


const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = [];
let comments = {};

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.username, req.body.password);
        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
            res.send({ username: user.username});
            return;
        }
    }
    res.status(401).send({ msg: 'Username not found' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.send({ msg: 'Logged out' });
});

app.get('/api/quote', async (req, res) => {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).send({ msg: 'Failed to fetch quote' });
    }
});

const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      req.user = user
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  };

apiRouter.get('/comments/:id', verifyAuth, (req, res) => {
    const imageId = req.params.id;
    res.send(comments[imageId] || []);
});

apiRouter.post('/comments/:id', verifyAuth, (req, res) => {
    const imageId = req.params.id;
    const { text } = req.body;
    if (!text.trim()) {
        return res.status(400).send({ msg: 'Comment cannot be empty' });
    }
    const newComment = {
        userName: req.user.username,
        text,
        timestamp: Date.now()
    };
    if (!comments[imageId]) {
        comments[imageId] = [];
    }
    comments[imageId].push(newComment);
    res.send({ msg: 'Comment added', comment: newComment });
});

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = { 
        username: username, 
        password: passwordHash,
        token: uuid.v4()
    };
    users.push(user);
    return user;
}

async function findUser(key, value) {
    if(!value) {
        return null;
    }
    return users.find(user => user[key] === value);
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });