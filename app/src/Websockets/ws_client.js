$(document).ready(function () {
    // Your code here
    'use strict';
    console.log('Starting ws_client.js javascript.');

    // Log to console
    function logMessage(message) {
        var datetime, date = new Date();
        datetime = date.getFullYear() + '-' + Fnlive.pad((date.getMonth()+1)) + '-' + Fnlive.pad(date.getDate()) + ' ' + Fnlive.pad(date.getHours()) + ':' + Fnlive.pad(date.getMinutes()) + ':' + Fnlive.pad(date.getSeconds());
        $('<p>' + datetime + ': ' + message + '</p>').prependTo('#output');
    }

    var url = $('#url').val(),
        websocket,
        // subProtocol = "echo-protocol",
        // subProtocol = "broadcast-protocol",
        subProtocol = $('#sub-protocol').val(),
        connect = document.getElementById('connect'),
        close = document.getElementById('close'),
        send = document.getElementById('send');

    $('#constatus').html(' disconnected');

    if (connect) {
        console.log('Found connect.');

    // Event handler to create the websocket connection when someone clicks the button #connect
    connect.addEventListener('click', function(event) {
        url = $('#url').val();
        subProtocol = $('#sub-protocol').val();
        console.log('Connecting to: ' + url + ' with ' + subProtocol);
        websocket = new WebSocket(url, subProtocol);

        // Eventhandler when the websocket is opened.
        websocket.onopen = function() {
            console.log('The websocket is now open.');
            logMessage('The websocket is now open.');
            $('#status').addClass('connected');
            $('#constatus').html(' connected to <strong>' + url + '</strong> with <strong>' + subProtocol + '</strong>');
            websocket.send('Thanks for letting me connect to you.');
        };

        websocket.onmessage = function(event) {
            console.log('Receiving message: ' + event.data);
            logMessage(event.data);
        };

        // Eventhandler when the websocket is closed.
        websocket.onclose = function() {
            console.log('The websocket is now closed.');
            logMessage('The websocket is now closed.');
            $('#status').removeClass('connected');
            $('#constatus').html('disconnected');
        };
    }, false);


    // Add eventhandler to close connection
    close.addEventListener('click', function(event) {
        if (!websocket || websocket.readyState === 3) {
            console.log('The websocket is not connected to a server.');
        } else {
            console.log("Closing connection to: " + websocket.url);
            websocket.close();
        }
        $('#constatus').innerHTML = '';
    });

    // Add eventhandler to send message
    send.addEventListener('click', function(event) {
        var message = "Hello World";

        message = $('#message').val() || message;

        if (!websocket || websocket.readyState === 3) {
            console.log('The websocket is not connected to a server.');
        } else {
            console.log("Sending message: " + message);
            websocket.send(message);
        }
    });

    }
});
