var method = Session.prototype;

function Session()
{

}

method.addToDB = function(db, sid, usr)
{
	db.query("INSERT INTO temp (session_id, username, securex) VALUES ('"+
		sid+"', '"+
		usr+"', 1)", function(error)
		{
			if(error)
				console.log(error);
		});
};

method.removeFromDB = function(db,sid,byid)
{
	if(byid)
	{
		db.query("DELETE FROM temp WHERE securex=1 AND session_id='"+sid+"'", function(error)
		{
			if(error)
				console.log(error);
		});
	}
	else
	{
		db.query("DELETE FROM temp WHERE securex=1", function(error)
		{
			if(error)
				console.log(error);
		});
	}
};

method.generateID = function()
{
	var a = Math.floor(Math.random() *999999999);
	var b = Math.floor(Math.random() *999999999);
	var x = "DRAGONSHIFT_ID"+a+b;
	console.log("Generated code: "+x);
	return x;	
};

module.exports = Session;