const service = require(__basename + '/service/service.js');

const SQL = require(__basename + '/lib/sql/sql.js');

const common = require(__basename + '/common/common.js');

const utils = require(__basename + '/lib/utils/utils.js');

const moment = require('moment');

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

	detailsController (req, res) {
		let detailssql = SQL.findOneForDetails(req.query);
		service.query(detailssql)
			.then((result) => {
				res.send(result);
			})
			.catch((err) => {
				res.json({'msg': '查询失败'})
			})
	}

	commentController (req, res) {
		let commentsql = SQL.findOneForComment(req.query);
		service.query(commentsql)
			.then((result) => {
				result.forEach((v) => {
					v.commentTime = moment(v.commentTime).format('YYYY-MM-DD HH:mm:ss');
				});
				res.send(result);
			})
			.catch((err) => {
				res.json({'msg': '查询失败'})
			})
	}

	shopcartController (req, res) {
		let shopcartsql = SQL.findAllForShopcart(req.query);
		service.query(shopcartsql)
			.then((result) => {
				result.forEach((v) => {
					v.cartTime = moment(v.cartTime).format('YYYY-MM-DD HH:mm:ss');
				})
				res.send(result);
			})
			.catch((err) => {
				res.json({'msg': '查询失败'})
			})
	}

	addShopcartController (req, res) {
		let addshopcartsql = SQL.insertOneForShopcart(req.query);
		service.query(addshopcartsql)
			.then((result) => {
				res.json({code: 200});
			})
			.catch((err) => {
				res.send(err);
			})
	}

	settleController (req, res) {
		let settlesql = SQL.findAllForSettle(req.query.id);
		service.query(settlesql)
			.then((result) => {
				res.send(result);
			})
			.catch((err) => {
				res.send(err);
			})
	}

}

module.exports = new RoutesController();