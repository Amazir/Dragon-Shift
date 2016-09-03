// Requires
var express = require('express');
var io = require('socket.io')(3001);
var Player = require('./server/player.js');

var app = express();

// Array of players
var players = [];

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
		// On new player
		socket.on('new_player', function(x,y,n)
		{
			var player = new Player(x,y,players.length+1);
			players.push(player);
			console.log("Initilized new player: "+n);
			io.emit('user_id', players.length);
			socket.id = players.length;
			console.log(players);
		});

		// On user disconnect
		socket.on('disconnect', function()
		{
			delete players[socket.id];
			console.log(players);
		});
	});
}

// Initialize the game
function init()
{
	setUpRouting();
	setUpEventHandlers();
}

init();

// Listening on port 3000
app.listen(3000);