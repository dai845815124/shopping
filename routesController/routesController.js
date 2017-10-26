const service = require(__basename + '/service/service.js');

const SQL = require(__basename + '/lib/sql/sql.js');

const common = require(__basename + '/common/common.js');

const utils = require(__basename + '/lib/utils/utils.js');

class RoutesController {
	constructor () {}

	rootController (req, res) {
		res.render('index');
	}

	registerController (req, res) {
		let sql = SQL.findOneForReg(req.body.email);
		service.query(sql)
			.then((result) => {
				if (Array.isArray(result) && result.length === 0) {
					utils.addCrypto(req.body, 'pwd');
					let insertsql = SQL.insertOneForReg(req.body);
					service.query(insertsql)
						.then((result) => {
							res.send(common.register.success);
						})
						.catch((err) => {
							res.send(common.register.error);
						})
				} else {
					res.send(common.register.warning);
				}
			})
			.catch((err) => {
				res.send(common.register.error);
			})
	}

	loginController (req, res) {
		utils.addCrypto(req.body, 'pwd');
		console.log('req.body ==> ', req.body);
		let loginsql = SQL.findOneForLogin(req.body);
		console.log('loginsql ==> ', loginsql);
		service.query(loginsql)
			.then((result) => {
				console.log('result ...==> ', result);
				if (Array.isArray(result) && result.length === 1) {
					res.send(common.login.success);
				} else {
					res.send(common.login.warning);
				}
			})
			.catch((err) => {
				res.send(common.login.error);
			})
	}

	homeController (req, res) {
		let homesql = SQL.findALLForHome();
		service.query(homesql)
			.then((result) => {
				res.send(result);
			})
			.catch((err) => {
				res.json({msg: '查询失败'});
			})
	}

}

module.exports = new RoutesController();