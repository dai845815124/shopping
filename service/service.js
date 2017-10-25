const mysql = require(__basename + '/lib/mysql/mysql.js');

class Service {
	constructor () {}

	query (sql) {
		return mysql.query(sql);
	}
}

module.exports = new Service();