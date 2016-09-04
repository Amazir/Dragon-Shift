// Requires
var express = require('express');
var io = require('socket.io')(3001);
var Player = require('./server/player.js');

var app = express();

// Array of players
var players = [];
var sockets = [];

// Setting up HTTP routing
function setUpRouting()
{
	// Game
	app.use('/game', express.static(__dirname + '/client'));
}

// Setting up Sockets Event Handlers
function setUpEventHandlers()
{
	// On user connection
	io.on('connection', function(socket)
	{
		socket.id = Math.random();
		sockets[socket.id] = socket;

		var player = new Player(50, 50, socket.id);
		players[socket.id] = player;

		socket.on('disconnect', function()
		{
			delete sockets[socket.id];
			delete players[socket.id];
		});

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
	    for(var i in players)
	    {
	        var player = players[i];
	        player.updatePosition();
	        pack.push(
	        {
	            x:player.x,
	            y:player.y,
	            number:player.number
	        });    
	    }
	    for(var i in sockets)
	    {
	        var socket = sockets[i];
	        socket.emit('new_positions',pack);
	    }
	},1000/25);
}

init();

// Listening on port 3000
app.listen(3000);