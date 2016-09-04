// Comunicate with server
var io = io('http://localhost:3001');

// Setting up canvas
var canvas = document.getElementById('gameWindow');
var ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;

var pImg = new Image();
pImg.src = "img/player/outfits/player.gif";

// Setting up Event Handlers
function setUpEventHandlers()
{
	io.on('new_positions', function(data)
	{
		// Drawing game
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for(var i=0; i<data.length;i++)
		{
			ctx.drawImage(pImg,data[i].x,data[i].y);
		}

	});
}

// Player movement
function move(event, g)
{
	if(g = 0)
	{
		switch(event.keyCode)
		{
			case 37:
				io.emit('key_pressed',{inputId:'key_left',state:true});
				break;
			case 39:
				io.emit('key_pressed',{inputId:'key_right',state:true});
				break;
			case 38:
				io.emit('key_pressed',{inputId:'key_up',state:true});
				break;
			case 40:
				io.emit('key_pressed',{inputId:'key_down',state:true});
				break;
		}
	}
	else
	{
		switch(event.keyCode)
		{
			case 37:
				io.emit('key_pressed',{inputId:'key_left',state:false});
				break;
			case 39:
				io.emit('key_pressed',{inputId:'key_right',state:false});
				break;
			case 38:
				io.emit('key_pressed',{inputId:'key_up',state:false});
				break;
			case 40:
				io.emit('key_pressed',{inputId:'key_down',state:false});
				break;
		}
	}
}

// Initialize game
function init()
{
	setUpEventHandlers();

	document.onkeydown = function(event)
	{
		switch(event.keyCode)
		{
			case 37:
				io.emit('key_pressed',{inputId:'key_left',state:true});
				break;
			case 39:
				io.emit('key_pressed',{inputId:'key_right',state:true});
				break;
			case 38:
				io.emit('key_pressed',{inputId:'key_up',state:true});
				break;
			case 40:
				io.emit('key_pressed',{inputId:'key_down',state:true});
				break;
		}
	}
	document.onkeyup = function(event)
	{
		switch(event.keyCode)
		{
			case 37:
				io.emit('key_pressed',{inputId:'key_left',state:false});
				break;
			case 39:
				io.emit('key_pressed',{inputId:'key_right',state:false});
				break;
			case 38:
				io.emit('key_pressed',{inputId:'key_up',state:false});
				break;
			case 40:
				io.emit('key_pressed',{inputId:'key_down',state:false});
				break;
		}
	}
}

init();