angular.module('app')
	.controller('rootController', ['$rootScope', '$state', function ($rootScope, $state) {

		$rootScope.user = {
			uid: 3,
			nickname: 'keewer',
			email: 'kangliuyong@126.com'
		};

		$rootScope.goPage = function (stateName, params) {
			$state.go(stateName, params);
		}

		$rootScope.goBack = function () {
			history.go(-1);
		}
		
	}])