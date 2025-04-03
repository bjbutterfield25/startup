const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
    const socketServer = new WebSocketServer({ server: httpServer });
}

module.exports = { peerProxy };