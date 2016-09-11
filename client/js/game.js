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

ctx.font="17px Arial";

var nick = "AmaziR";

window.onload = function()
{
	if(showCookie('session_id'))
	{
		io.emit('re_session', showCookie('session_id'));
		io.on('re_session_status', function(data)
		{
			if(data.valid)
			{
				$('#login').css({'display': 'none'});
				$('#game').css({'display': 'block'});

				nick = data.nick;
			}
			else
				deleteCookie('session_id');
		});
	}
	else
	{
		$('#login').css({'display': 'block'});
		$('#game').css({'display': 'none'});
	}
};

$('#send_msg').click(function()
{
	io.emit('incoming_chat_message', nick+": "+$('#msg').val());
	$('#msg').val('');
});

$('#login-signIn').click(function()
{
	var username = $('#login-username').val();
	var password = $('#login-password').val();
	io.emit('login_request', {username:username,password:password});
	$('#login-username').val('');
	$('#login-password').val('');
});

$('#logout').click(function()
{
	io.emit('logout');

	io.on('logged_out', function()
	{
		deleteCookie('session_id');
	});
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

// Setting up Event Handlers
function setUpEventHandlers()
{
	// Login handlers
	io.on('login_status', function(data)
	{
		if(data.valid)
		{
			$('#login').css({'display': 'none'});
			$('#game').css({'display': 'block'});

			io.on('session_code', function(data)
			{
				setCookie('session_id', data);
			});
		}
		else
		{	
			$('#login').css({'display': 'block'});
			$('#game').css({'display': 'none'});
			$('#error_box').html('<font color="red"><b>Wrong username or password / account is not activated !</b></font>');
			setTimeout(function()
			{
				$('#error_box').html('');
			}, 4000);
		}
	});

	// Game chat script
	io.on('chat_message', function(msg)
	{
		$('#messages').append("<li>"+msg+"</li>");
	});

	// On changing position by players
	io.on('new_positions', function(data)
	{
		/*

			DRAWING GAME

		*/

		// Clear screen
		ctx.clearRect(0,0,canvas.width,canvas.height);

		// Drawing map
		var tileSize = 32;
		var tileX = 0;
		var tileY = 0;
		for(var i=0; i<mapArray.length; i++)
		{
			for(var j=0; j < mapArray[i].length; j++)
			{
				var ma = mapArray[i][j];
				switch(ma)
				{
					case 0:
						ctx.drawImage(grass, tileX, tileY, tileSize, tileSize);
						break;
					case 1:
						ctx.drawImage(sand, tileX, tileY, tileSize, tileSize);
						break;
					case 2:
						ctx.drawImage(water, tileX, tileY, tileSize, tileSize);
						break;
				}
				tileX+=32;
			}
			tileX=0;
			tileY+=32;
		}
		posY=0;

		// Drawing player
		for(var i=0; i<data.length;i++)
		{
			ctx.drawImage(pImg,data[i].x,data[i].y);
			ctx.fillText(data[i].nick, data[i].x-data[i].width/2, data[i].y-data[i].height);
			var collision = (data[i].x, data[i].y, 32, 32, 290, 110, 32, 32);
			io.emit('is_colliding', collision);
		}

	});
}

// Secure the client
function secure()
{
	if (showCookie('session_id')) {}
	else
	{
		io.emit('logout');
		io.on('logged_out', function()
		{
			$('#login').css({'display': 'block'});
			$('#game').css({'display': 'none'});
		});
	}
}

// Initialize game
function init()
{
	setUpEventHandlers();

	setInterval(secure, 1000/25);

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