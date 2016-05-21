$(document).ready(function () {
    // Your code here
    'use strict';
    console.log('Starting ws_chat_client.js javascript.');

    // Log to console
    function logMessage(message) {
        var datetime, date = new Date();
        datetime = date.getFullYear() + '-' + Fnlive.pad((date.getMonth()+1)) + '-' + Fnlive.pad(date.getDate()) + ' ' + Fnlive.pad(date.getHours()) + ':' + Fnlive.pad(date.getMinutes()) + ':' + Fnlive.pad(date.getSeconds());
        $('<p>' + datetime + ': ' + message + '</p>').prependTo('#output');
    };

    function displayUsers(users) {
        $('#users').html('');
        for (var i = 0; i < users.length; i++) {
            $('<p>' + users[i] + '</p>').prependTo('#users');
        }
    }

    var url = $('#url').val(),
        websocket,
        subProtocol = 'chat-protocol',
        // subProtocol = $('#sub-protocol').val(),
        user = $('#user').val(),
        connect = document.getElementById('chat-connect'),
        close = document.getElementById('chat-close'),
        send = document.getElementById('chat-send');

    $('#constatus').html(' disconnected');
    if (connect) {
        console.log('Found connect.');


    // Event handler to create the websocket connection when someone clicks the button #connect
    connect.addEventListener('click', function(event) {
        if (!websocket  || websocket.readyState === 3) {
            console.log('The websocket is not connected to a server. Try connect.');
            url = $('#url').val();
            subProtocol = 'chat-protocol';
            user = $('#user').val();
            console.log('Connecting to: ' + url + ' with ' + subProtocol + ' for user ' + user);
            websocket = new WebSocket(url, subProtocol);

            // Eventhandler when the websocket is opened.
            websocket.onopen = function() {
                var msg;
                console.log('The websocket is now open.');
                $('#status').addClass('connected');
                $('#constatus').html('<strong> ' + user + '</strong> connected to <strong>' + url + '</strong> with <strong>' + subProtocol + '</strong>');
                // Send ctrl message with user info.
                msg = {
                    type:       'ctrl',
                    subtype:   'add-user',
                    id:         user,
                    date:       Date.now()
                };
                websocket.send(JSON.stringify(msg));
                console.log('Sending ' + JSON.stringify(msg));
            }

            websocket.onmessage = function(event) {
                var msg;

                console.log('Receiving message: ' + event.data);
                msg =  JSON.parse(event.data);
                // Check message type.
                if (msg.type === 'ctrl') {
                    if (msg.subtype === 'add-user') {
                        // Announce new users on chat.
                        logMessage(msg.id + ' joined the chat.');
                    } else if (msg.subtype === 'quit-user') {
                        logMessage(msg.id + ' left the chat.');
                    } else if (msg.subtype === 'list-users') {
                        // Update users connected.
                        displayUsers(msg.users);
                    }
                } else if (msg.type === 'message') {
                    logMessage(' ' + msg.id + '> ' + msg.text);
                }
            }

            // Eventhandler when the websocket is closed.
            websocket.onclose = function() {
                console.log('The websocket is now closed.');
                $('#status').removeClass('connected');
                $('#constatus').html('disconnected');
                displayUsers([]);
            }
        } else {
            console.log('Already connected. Readystate: ' + websocket.readyState);
        }
    }, false);


    // Add eventhandler to close connection
    close.addEventListener('click', function(event) {
        if (!websocket || websocket.readyState === 3) {
            console.log('The websocket is not connected to a server.');
        } else {
            console.log("Closing connection to: " + websocket.url);
            websocket.close();
        }
    });

    // Add eventhandler to send message
    send.addEventListener('click', function(event) {
        var message = "Hello World", msg;

        message = $('#message').val() || message;
        msg = {
            type:   'message',
            text:   message,
            id:     user,
            date:   Date.now()
        };

        if (!websocket || websocket.readyState === 3) {
            console.log('The websocket is not connected to a server.');
        } else {
            console.log("Sending message: " + message);
            // websocket.send(message);
            websocket.send(JSON.stringify(msg));
        }
    });
    }
});
