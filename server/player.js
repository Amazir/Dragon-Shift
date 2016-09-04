var method = Player.prototype;

function Player(x, y, id)
{
	this.x = x;
	this.y = y;
	this.id = id;
	this.nick = "unnamed";

	this.pressingRight = false;
	this.pressingLeft = false;
	this.pressingUp = false;
	this.pressingDown = false;

	this.maxSpd = 10;
}

method.updatePosition = function()
{
	if(this.pressingLeft)
		this.x-=this.maxSpd;
	if(this.pressingRight)
		this.x+=this.maxSpd;
	if(this.pressingUp)
		this.y-=this.maxSpd;
	if(this.pressingDown)
		this.y+=this.maxSpd;
}

method.getX = function()
{
	return this.x;
};

method.getY = function()
{
	return this.y;
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