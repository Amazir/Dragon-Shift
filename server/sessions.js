var method = Session.prototype;

function Session()
{

}

method.addToDB = function(db, sid, usr)
{
	db.query("INSERT INTO temp (session_id, username) VALUES ('"+
		sid+"', '"+
		usr+"')", function(error)
		{
			if(error)
				console.log(error);
		});
};

method.removeFromDB = function(db,sid)
{
	db.query("DELETE FROM temp WHERE session_id='"+sid+"'", function(error)
	{
		if(error)
			console.log(error);
	});
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