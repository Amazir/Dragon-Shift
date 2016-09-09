// Requires
var express = require('express');
var io = require('socket.io')(3001);
var mysql = require('mysql');

var Player = require('./server/player.js');
var Session = require('./server/sessions.js');

var app = express();

var session = new Session();

// Array of PLAYERS_LIST
var PLAYERS_LIST = [];
var SOCKETS_LIST = [];

// Mysql config
var db_conn = mysql.createConnection(
{
	host      : 'localhost',
	user      : 'root',
	password  : '',
	database  : 'dragonshift'
});

// Connecting to DB
db_conn.connect(function(err)
{
	if(err)
		console.log(err);
	else
		console.log("DB CONNECTED");
});

// Setting up HTTP routing
function setUpRouting()
{
	// Game
	app.use('/game', express.static(__dirname + '/client'));
}

// Setting up SOCKETS_LIST Event Handlers
function setUpEventHandlers()
{
	// On connection
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

		// On user logout
		socket.on('logout', function()
		{
			session.removeFromDB(db_conn, PLAYERS_LIST[socket.id].getSessionCode());
			socket.emit('logged_out');
		});

		// On user session resumed
		socket.on('re_session', function(data)
		{
			db_conn.query("SELECT * FROM temp WHERE session_id='"+data+"'", function(err, rows, fields)
			{
				if(rows.length === 1)
					socket.emit('re_session_status', {valid:true});
				else
					socket.emit('re_session_status', {valid:true});
			});
		});

		// Login request
		socket.on('login_request', function(data)
		{
			db_conn.query("SELECT * FROM players WHERE login='"+
				data.username+"' AND pass='"+
				data.password+"'", 
				function(err, rows, fields)
				{
					if(err)
						console.log(err);
					else
					{
						if(rows.length === 1)
						{
							socket.emit('login_status', {valid:true});
							var sid = session.generateID();
							PLAYERS_LIST[socket.id].setSessionCode(sid);
							session.addToDB(db_conn, sid, data.username);
							socket.emit('session_code', PLAYERS_LIST[socket.id].getSessionCode());
						}
						else
						{
							socket.emit('login_status', {valid:false});
						}
					}
				});
		});

		// On incoming chat message
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
