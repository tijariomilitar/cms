const db = require('../../config/connection');
const lib = require('jarmlib');

const User = function(){
	this.id = 0;
	this.name = "";
	this.username = "";
	this.password = "";
};

User.save = (user) => {
	let query = "INSERT INTO model_db.user (name, username, password) values ('"+
	user.name+"', '"+
	user.username+"', '"+
	user.password+"')";
    return db(query);
};

User.list = () => {
	let query = "SELECT * FROM model_db.user;";
	return db(query);
};

User.filter = (props, inners, period, params, strict_params, order_params, limit) => {
	let query = new lib.Query().select().props(props).table("model_db.user")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).limit(limit).build().query;
	return db(query);
};

User.findById = (id) => {
	let query = "SELECT * FROM model_db.user WHERE id='"+id+"';";
	return db(query);
};

User.updateAccess = (user) => {
	let query = "UPDATE model_db.user SET access='"+user.newAccess+"', job='"+user.newJob+"' WHERE id='"+user.id+"';";
	return db(query);
};

User.updatePassword = (user) => {
	let query = "UPDATE model_db.user SET password='"+user.password+"' WHERE id='"+user.id+"';";
	return db(query);
};

module.exports = User;