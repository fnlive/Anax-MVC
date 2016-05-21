var port = 8012;
// var port = 1337;
// var port = 80;

// Require the modules we need
var http = require('http');

// Create a http server with a callback handling all requests
var httpServer = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(200, {'Content-type': 'text/plain'});
  response.end('Hello world\n');
});

// Setup the http-server to listen to a port
httpServer.listen(port, function() {
  console.log((new Date()) + ' HTTP server is listening on port ' + port);
});

// Always check and explicitly allow the origin
function originIsAllowed(origin) {
  if (origin === 'http://dbwebb.se' || origin === 'http://localhost') {
    return true;
  }
  return false;
}

// Require the modules we need
var WebSocketServer = require('websocket').server;

// Create an object for the websocket
// https://github.com/Worlize/WebSocket-Node/wiki/Documentation
wsServer = new WebSocketServer({
  httpServer: httpServer,
  autoAcceptConnections: false
});

function wsRequestEcho(request) {
    var connection = request.accept('echo-protocol');
    console.log('Request echo-protocol');
    console.log((new Date()) + ' Connection accepted from ' + request.origin);

    // Callback to handle each message from the client
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });

    // Callback when client closes the connection
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
    return true;
}

/**
 * Avoid injections
 *
 */
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


// Keep list of clients to broadcast to.
var broadcastTo = [];
function wsRequestBroadcast(request) {
    console.log('Request broadcast-protocol');
    var connection = request.accept('broadcast-protocol', request.origin);
    connection.broadcastId = broadcastTo.push(connection) - 1;
    console.log((new Date()) + ' Broadcast connection accepted from ' + request.origin + ' id = ' + connection.broadcastId);

    // Callback to handle each message from the client
    connection.on('message', function(message) {
        var clients = 0;
        for (var i=0; i<broadcastTo.length; i++) {
            if (broadcastTo[i]) {
                clients++;
                broadcastTo[i].sendUTF(htmlEntities(message.utf8Data));
            }
        }
        console.log('Broadcasted message to ' + clients + ' clients: ' + message.utf8Data);
    });

    // Callback when client closes the connection
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected broadcastid = ' + connection.broadcastId + '.');
        broadcastTo[connection.broadcastId] = null;
    });
    return true
}

function buildChatUserList(chatList){
    var users = [];
    for (var i=0; i<chatList.length; i++) {
        if (chatList[i]) {
            users.push(chatList[i].user);
        }
    }
    return users;
}

function sendToChatUsers(chatList, msg2send){
    var clients = 0;
    for (var i=0; i<chatList.length; i++) {
        if (chatList[i]) {
            clients++;
            chatList[i].sendUTF(JSON.stringify(msg2send));
        }
    }
    console.log('Broadcasted message to ' + clients + ' clients: ' + JSON.stringify(msg2send));
}

// Keep list of clients in the chat.
var chatList = [];
function wsRequestChat(request) {
    console.log('Request chat-protocol');
    var connection = request.accept('chat-protocol', request.origin);
    // TODO: Check if already connected to client? If so, throw connection?
    connection.chatId = chatList.push(connection) - 1;
    console.log((new Date()) + ' Chat connection accepted from ' + request.origin + ' id = ' + connection.chatId);

    // Callback to handle each message from the client
    connection.on('message', function(message) {
        var msg, msg2send;
        // Check message type
        console.log('Message: ' + message.utf8Data);
        msg = JSON.parse(message.utf8Data);
        if (msg.type === 'ctrl') {
            if (msg.subtype === 'add-user') {
                sendToChatUsers(chatList, msg);
                connection.user = msg.id;
                msg2send = {
                    type:       'ctrl',
                    subtype:    'list-users',
                    users:      buildChatUserList(chatList),
                    date:       Date.now()
                }
            }
        } else if (msg.type === 'message') {
            // Normal chat message, echo-broadcast to all chat users.
            msg2send = msg;
        }
        sendToChatUsers(chatList, msg2send);
    });

    // Callback when client closes the connection
    connection.on('close', function(reasonCode, description) {
        var msg2send, user = chatList[connection.chatId].user;
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected broadcastid = ' + connection.chatId + '.');
        chatList[connection.chatId] = null;
        msg2send = {
            type:       'ctrl',
            subtype:    'list-users',
            users:      buildChatUserList(chatList),
            date:       Date.now()
        }
        sendToChatUsers(chatList, msg2send);
        msg2send = {
            type:       'ctrl',
            subtype:   'quit-user',
            id:         user,
            date:       Date.now()
        };
        sendToChatUsers(chatList, msg2send);
    });
    return true
}

// Create a callback to handle each connection request
wsServer.on('request', function(request) {
    var status = null;
    // if (!originIsAllowed(request.origin)) {
    //    // Make sure we only accept requests from an allowed origin
    //    request.reject();
    //    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    //    return;
    // }

    // Loop through protocols from client
    for (var i = 0; i < request.requestedProtocols.length; i++) {
        if (request.requestedProtocols[i] === 'broadcast-protocol') {
            status = wsRequestBroadcast(request);
        } else if (request.requestedProtocols[i] === 'echo-protocol') {
            status = wsRequestEcho(request);
        } else if (request.requestedProtocols[i] === 'chat-protocol') {
            status = wsRequestChat(request);
        }
        if (!status) {
            request.reject(403, 'Protocol ' + request.requestedProtocols[i] + ' not supported');
            console.log('Protocol ' + request.requestedProtocols[i] + ' not supported');
        }
    }
});
