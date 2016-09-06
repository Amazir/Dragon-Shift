// Requires
var express = require('express');
var io = require('socket.io')(3001);
var Player = require('./server/player.js');

var app = express();

// Array of PLAYERS_LIST
var PLAYERS_LIST = [];
var SOCKETS_LIST = [];

// Setting up HTTP routing
function setUpRouting()
{
	// Game
	app.use('/game', express.static(__dirname + '/client'));
}

// Setting up SOCKETS_LIST Event Handlers
function setUpEventHandlers()
{
	// On user connection
	io.on('connection', function(socket)
	{
		socket.id = Math.random();
		SOCKETS_LIST[socket.id] = socket;

		var player = new Player(50, 50, socket.id);
		PLAYERS_LIST[socket.id] = player;

		// On user disconnect
		socket.on('disconnect', function()
		{
			delete SOCKETS_LIST[socket.id];
			delete PLAYERS_LIST[socket.id];
		});

		socket.on('incoming_chat_message', function(msg)
		{
			io.emit('chat_message', msg);
		});

		// On key pressed by user
		socket.on('key_pressed', function(data)
		{
			switch(data.inputId)
			{
				case "key_left":
					player.pressingLeft = data.state;
					break;
				case "key_right":
					player.pressingRight = data.state;
					break;
				case "key_up":
					player.pressingUp = data.state;
					break;
				case "key_down":
					player.pressingDown = data.state;
					break;
			}
		});
	});
}

// Initialize the game
function init()
{
	setUpRouting();
	setUpEventHandlers();

	setInterval(function()
	{
	    var pack = [];
	    for(var i in PLAYERS_LIST)
	    {
	        var player = PLAYERS_LIST[i];
	        player.updatePosition();
	        pack.push(
	        {
	            x:player.x,
	            y:player.y,
	            number:player.number
	        });
	    }
	    for(var i in SOCKETS_LIST)
	    {
	        var socket = SOCKETS_LIST[i];
	        socket.emit('new_positions',pack);
	    }
	},1000/25);
}

init();

// Listening on port 3000
app.listen(3000);
