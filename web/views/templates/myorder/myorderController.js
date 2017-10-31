angular.module('app')
	.controller('myorderController', ['$rootScope', '$scope', 'API', 'utils', function ($rootScope, $scope, API, utils) {

		$scope.isNotHas = true;

		$scope.isDisc = false;

		utils.tips.initPopover($scope);

		utils.tips.showLoadTips();
		API.fetchGet('/myorder', {email: $rootScope.user.email})
			.then(function (data) {
				$scope.data = data.data;
				console.log($scope.data);
				if ($scope.data.length > 0) {
					$scope.isNotHas = false;
				}
				utils.tips.hideLoadTips();
			})
			.catch(function (err) {
				console.log(err);
				utils.tips.hideLoadTips();
			})


			$scope.discussion = function (e) {
				utils.tips.openPopover($scope, e);
			}

			$scope.closePopover = function () {
				utils.tips.closePopover($scope);
			}

			$scope.confirmDisc = function () {
				utils.tips.closePopover($scope);
			}

	}])