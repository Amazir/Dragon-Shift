// Requires
var express = require('express');
var io = require('socket.io')(3001);
var Player = require('./server/player.js');

var app = express();

// Array of players
var players = [];

// Setting up Sockets Event Handlers
function setUpEventHandlers()
{
	// On user connection
	io.on('connection', function(socket)
	{
		// On user disconnect
		socket.on('disconnect', function()
		{

		});
		console.log('a user connected!');
	});
}

// Initialize the game
function init()
{
	setUpEventHandlers();
}

// Listening on port 3000
app.listen(3000);