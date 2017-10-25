const RoutesController = require(__basename + '/routesController/routesController.js');

module.exports = function (app) {

	app.get('/', RoutesController.homeController);

	app.post('/register', RoutesController.registerController);

}