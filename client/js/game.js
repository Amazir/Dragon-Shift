// Comunicate with server
var io = io('http://localhost:3001');

// Setting up canvas
var canvas = document.getElementById('gameWindow');
var ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;

var player = new Player(50, 50, "Alban");

// Initializing players
io.emit('new_player', player.getX(), player.getY(), player.getNickname());

// Setting up Event Handlers
function setUpEventHandlers()
{
	io.on('user_id', function(id)
	{
		player.setID(id);
		// Send user ID to server
		io.emit('id_incoming', id);
	});
}

// Drawing game
function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillRect(0, 0, 32, 32);

	window.requestAnimationFrame(draw);
}

// Initialize game
function init()
{
	setUpEventHandlers();
	window.requestAnimationFrame(draw);
}

init();