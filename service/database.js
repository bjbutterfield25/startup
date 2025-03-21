const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const commentCollection = db.collection('comment');

(async function testConnection() {
    try {
      await db.command({ ping: 1 });
      console.log(`Connect to database`);
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
  })();


async function addUser(user) {
    await userCollection.insertOne(user);
}

async function getUser(username) {
    return await userCollection.findOne({
        username: username
    });
}

async function getUserByToken(token) {
    return await userCollection.findOne({
        token: token
    });
}

async function updateUser(user) {
    await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function addComment(comment) {
    await commentCollection.insertOne(comment);
}

async function getComments(imageId) {
    return await commentCollection.find({ imageId: imageId }).toArray();
}

async function deleteComments(imageId, index) {
    const comments = await commentCollection.find({ imageId: imageId }).toArray();
    if (index < 0 || index >= comments.length) {
        return false;
    }
    const commentId = comments[index]._id;
    const result = await commentCollection.deleteOne({ _id: commentId });
    return result.deletedCount > 0;
}

module.exports = {
    addUser,
    getUser,
    getUserByToken,
    updateUser,
    addComment,
    getComments,
    deleteComments
}