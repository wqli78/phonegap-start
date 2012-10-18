'use strict';



var zhongyi = angular.module('zhongyi', []). //注入服务
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/index', {
		templateUrl: '/angular/views/zhongyi.html',
		controller: IndexCtrl
	}).
	otherwise({
		redirectTo: '/index'
	});
}]);