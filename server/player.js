var method = Player.prototype;

function Player(x, y, id)
{
	this.x = x;
	this.y = y;
	this.id = id;
}

method.getX = function()
{
	return this.x;
};

method.getY = function()
{
	return this.y;
};

method.getID = function()
{
	return this.id;
};

module.exports = Player;