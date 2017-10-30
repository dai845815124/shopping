angular.module('app')
	.controller('detailsController', ['$rootScope', '$scope', '$stateParams', 'API', 'utils', function ($rootScope, $scope, $stateParams, API, utils) {

		utils.tips.showLoadTips();
		API.fetchGet('/details/' + $stateParams.id, $stateParams)
			.then(function (data) {
				$scope.data = data.data;

				$scope.pdetails = {
					imgUrl: $scope.data[0].imgUrl,
					pname: $scope.data[0].name,
					price: $scope.data[0].price,
					count: 1,
					email: $rootScope.user.email,
					nickname: $rootScope.user.nickname,
					proid: $stateParams.id,
					cartTime: ''
				};

				utils.tips.hideLoadTips();
			})
			.catch(function (err) {
				console.log(err);
				utils.tips.hideLoadTips();
			})

			$scope.addShopCart = function () {
				$scope.pdetails.cartTime = new Date().format("yyyy-MM-dd hh:mm:ss");
				utils.tips.showLoadTips();
				API.fetchPut('/shopCart/' + $stateParams.id, $scope.pdetails)
				.then(function (data) {
					utils.tips.hideLoadTips();
				})
				.catch(function (err) {
					console.log('err ==> ', err);
					utils.tips.hideLoadTips();
				})
			}

	}])