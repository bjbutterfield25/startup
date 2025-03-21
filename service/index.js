const express = require('express');
const app = express();
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const DB = require('./database.js');
const { Db } = require('mongodb');

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
            await DB.updateUser(user);
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
        DB.updateUser(user);
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

apiRouter.get('/recent-comments', verifyAuth, (req, res) => {
    let allComments = [];
    Object.keys(comments).forEach(imageId => {
        comments[imageId].forEach(comment => {
            allComments.push({
                userName: comment.userName,
                imageId: imageId,
                timestamp: comment.timestamp
            });
        });
    });
    allComments.sort((a, b) => b.timestamp - a.timestamp);
    res.send(allComments.slice(0, 3));
});

apiRouter.get('/comments/:id', verifyAuth, async (req, res) => {
    const imageId = req.params.id;
    const comments = await DB.getComments(imageId)
    res.send(comments || []);
});

apiRouter.post('/comments/:id', verifyAuth, (req, res) => {
    const imageId = req.params.id;
    const { text } = req.body;
    const newComment = {
        userName: req.user.username,
        text,
        timestamp: Date.now(),
        imageId: imageId
    };
    DB.addComment(newComment);
    res.send({ msg: 'Comment added', comment: newComment });
});

apiRouter.delete('/comments/:id/:index', verifyAuth, async (req, res) => {
    const imageId = req.params.id;
    const index = parseInt(req.params.index);
    try {
        const success = await DB.deleteComments(imageId, index);
        if (success) {
            res.send({ msg: 'Comment deleted successfully' });
        } else {
            res.status(404).send({ msg: 'Comment not found or invalid index' });
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).send({ msg: 'Failed to delete comment' });
    }
});

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = { 
        username: username, 
        password: passwordHash,
        token: uuid.v4()
    };
    await DB.addUser(user);
    return user;
}

async function findUser(key, value) {
    if(!value) {
        return null;
    }
    if (key === 'token') {
        return DB.getUserByToken(value);
    }
    return DB.getUser(value);
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