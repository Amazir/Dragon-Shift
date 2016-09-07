// Comunicate with server
var io = io('http://localhost:3001');

// Setting up canvas
var canvas = document.getElementById('gameWindow');
var ctx = canvas.getContext('2d');
canvas.width = 1010;
canvas.height = 620;

var pImg = new Image();
pImg.src = "res/img/player/outfits/player.gif";

var debugX =0, debugY =0;

// Tiles
var grass = new Image();
var water = new Image();

var sand = new Image();
grass.src = 'res/maps/tiles/grass.png';
water.src = 'res/maps/tiles/water.png';
sand.src = 'res/maps/tiles/sand.png';

var nick = "Gracz"+Math.floor(Math.random()*10)+1;

$('#chat').submit(function()
{
	io.emit('incoming_chat_message', nick+": "+$('#msg').val());
	$('#msg').val('');
	return false;
});

var mapArray = [
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,1,1,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,2,2,2,2,2,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,2,2,2,2,2,2,2,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,2,2,2,2,2,2,2,2,2,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,2,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2],
[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,2]
];

var posX = 0;
var posY = 0;

// Setting up Event Handlers
function setUpEventHandlers()
{
	// Game chat script
	io.on('chat_message', function(msg)
	{
		$('#messages').append("<li>"+msg+"</li>");
	});

	io.on('new_positions', function(data)
	{
		document.getElementById('info').innerHTML = "X: "+debugX+"<br /> Y: "+debugY+"<br />";
		// Drawing game
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for(var i=0; i<mapArray.length; i++)
		{
			for(var j=0; j < mapArray[i].length; j++)
			{
				if(mapArray[i][j] == 0)
				{
					ctx.drawImage(grass, posX, posY, 32, 32);
				}
				if(mapArray[i][j] == 1)
				{
					ctx.drawImage(sand, posX, posY, 32, 32);
				}
				if(mapArray[i][j] == 2)
				{
					ctx.drawImage(water, posX, posY, 32, 32);
				}
				posX+=32;
			}
			posX=0;
			posY+=32;
		}
		posX =0;
		posY =0;

		for(var i=0; i<data.length;i++)
		{
			debugX = data[i].x;
			debugY = data[i].y;
			ctx.drawImage(pImg,data[i].x,data[i].y);
			var collision = (data[i].x, data[i].y, 32, 32, 290, 110, 32, 32);
			io.emit('is_colliding', collision);
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