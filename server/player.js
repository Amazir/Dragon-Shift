var method = Player.prototype;

function Player(x, y, id)
{
	this.x = x;
	this.y = y;

	this.oldX = x;
	this.oldY = y;

	this.id = id;
	this.nick = "unnamed";

	this.sessionCode = "";

	this.pressingRight = false;
	this.pressingLeft = false;
	this.pressingUp = false;
	this.pressingDown = false;

	this.maxSpd = 10;
}

method.updatePosition = function()
{
	if(this.pressingLeft)
	{
		this.oldX = this.x;
		this.x-=this.maxSpd;
	}
	if(this.pressingRight)
	{
		this.oldX = this.x;
		this.x+=this.maxSpd;
	}
	if(this.pressingUp)
	{
		this.oldY = this.y;
		this.y-=this.maxSpd;
	}
	if(this.pressingDown)
	{
		this.oldY = this.y;
		this.y+=this.maxSpd;
	}
}

method.setSessionCode = function(code)
{
	this.sessionCode = code;
};

method.getSessionCode = function()
{
	return this.sessionCode;
};

method.getX = function()
{
	return this.x;
};

method.getY = function()
{
	return this.y;
};

method.getOldX = function()
{
	return this.oldX;
};

method.getOldY = function()
{
	return this.oldY;
};

method.setX = function(x)
{
	this.x = x;
};

method.setY = function(y)
{
	this.y = y;
};

method.getName = function()
{
	return this.nick;
};

method.setName = function(nick)
{
	this.nick = nick;
};

method.getID = function()
{
	return this.id;
};

module.exports = Player;