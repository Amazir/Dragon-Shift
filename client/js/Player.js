var method = Player.prototype;

function Player(x, y, nick)
{
	this.x = x;
	this.y = y;
	this.id = 0;
	this.nick = nick;
}

method.getX = function()
{
	return this.x;
}

method.setX = function(x)
{
	this.x = x;
}

method.getY = function()
{
	return this.y;
}

method.setY = function(y)
{
	this.y = y;
}

method.setID = function(id)
{
	this.id = id;
}

method.getID = function()
{
	return this.id;
}

method.move = function(x,y)
{
	this.x = this.x + x;
	this.y = this.y + y;
}

method.getNickname = function()
{
	return this.nick;
}