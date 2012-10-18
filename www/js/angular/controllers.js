'use strict';

/* Controllers */

function IndexCtrl($scope, $http, Zuser) {
	//查询参数
	$scope.queryData = {
		q: '',
		haveTel: false,
		telNumber: '',
		role: 'all'
	};

	var mylimit = 10;

	//选择用户参数
	$scope.selectedUsers = [];

	//改变某用户的选择状态
	$scope.changSelectStatus = function(user) {
		var inArray = $scope.inSelectedUsers(user);
		if(inArray) {
			var inOk = _.find($scope.selectedUsers, function(eachUser) {
				return Number(eachUser.alias) == Number(user.alias);
			});
			$scope.selectedUsers.splice(_.indexOf($scope.selectedUsers, inOk), 1);
		} else {
			$scope.selectedUsers.push(user);
		}
	};
	//判断列表中的用户是否是已经选中的用户
	$scope.inSelectedUsers = function(user) {
		var inOk = _.find($scope.selectedUsers, function(eachUser) {
			return Number(eachUser.alias) == Number(user.alias);
		});
		// 返回了查到的第一个对象，如果存在，则返回真，否则返回假
		if(inOk) {
			return true;
		} else {
			return false;
		}
	};

	$scope.gotoPage = function(pageInfo) {
		if(pageInfo.index && pageInfo.index == pageInfo.currentPage) { //当前页不进行操作
			return;
		}
		$scope.zusers = Zuser.page(pageInfo, function(data) {
			$scope.pageJson = $scope.createPagerJson(data.pageData);
		});
	};
	//创建分页的JSON数据
	$scope.createPagerJson = function(pageData) {
		var total = pageData.total || 0;
		var limit = pageData.limit || mylimit;
		var from = pageData.from;
		var skip = from;
		var query = pageData.query || {}; //回传查询条件，保证分页一致性
		var start, finish;
		var totalPages = Math.ceil(total / limit) + 1;
		var currentPage = skip / limit + 1;
		var visiblePages = 5;

		var pageJson = [];

		pageJson.push(_.extend({
			index: currentPage,
			limit: limit,
			from: limit * i || false,
			currentPage: currentPage
		}, query));


		var additionalForward = currentPage < visiblePages ? visiblePages - currentPage : 0;
		var i;
		for(i = currentPage + 1;
		(i < currentPage + visiblePages + additionalForward) && (i < totalPages); i++) {
			start = (i - 1) * limit + 1;
			pageJson.push(_.extend({
				index: i,
				limit: limit,
				from: start,
				currentPage: currentPage
			}, query));

		}

		if(currentPage < totalPages - 1) {
			var lastPageStart = (totalPages - 2) * limit + 1;
			pageJson.push(_.extend({
				index: ">>",
				limit: limit,
				from: lastPageStart,
				currentPage: currentPage
			}, query));
		}

		var additionalBackward = (totalPages - currentPage) < visiblePages ? visiblePages - (totalPages - currentPage) : 0;
		for(i = currentPage - 1;
		(i > currentPage - visiblePages - additionalBackward) && (i > 0); i--) {
			start = (i - 1) * limit + 1;
			pageJson.unshift(_.extend({
				index: i,
				limit: limit,
				from: start,
				currentPage: currentPage
			}, query));
		}


		if(currentPage > 1) {
			pageJson.unshift(_.extend({
				index: "<<",
				limit: limit,
				from: 1,
				currentPage: currentPage
			}, query));
		}
		return pageJson;
	};

	$scope.gotoPage({
		limit: mylimit,
		from: 1
	});

	$scope.sendSms = function(data) {
		$http.post('/api/sendsms', data).success(function(err) {

		});
	};

}


function ZuserEditCtrl($scope, $routeParams, Zuser) {

	var id = $routeParams.id;

	// else {
	$scope.zuser = Zuser.get({
		id: id
	});
	var zuser = $scope.zuser;
	// var client = $scope.client;
	$scope.saveZuser = function() {
		if(zuser.alias > 0) { //编辑更新
			// alert(zuser.username);
			zuser.$update({
				id: zuser.alias
			});
		} else { //新增
			zuser.$save();
		}
		window.location = "#/index";
	};

	$scope.deleteZuser = function() {
		$scope.zuser.$delete({
			id: $scope.zuser.alias
		}, function() {
			alert('用户 ' + $scope.zuser.username + ' 已经删除');
			window.location = "#/index";
		});
	};
}


function TreatmentAddOrEditCtrl($scope) {
	$scope.cantCreate = function(type) {
		var cant;
		if(type === 'zhiyan') {
			cant = $scope.treatment.basicInfo && $scope.treatment.basicInfo.name && $scope.treatment.duibi.before && $scope.treatment.duibi.after ? false : 'checked';
		} else {
			cant = $scope.treatment.basicInfo && $scope.treatment.basicInfo.name ? false : 'checked';
		}
		return cant;
	};
	$scope.noUserName = function() {
		return $scope.treatment.basicInfo && $scope.treatment.basicInfo.name ? false : true;
	};
	$scope.noDuibiBefore = function() {
		return $scope.treatment.duibi && $scope.treatment.duibi.before ? false : true;
	};
	$scope.noDuibiAfter = function() {
		return $scope.treatment.duibi && $scope.treatment.duibi.after ? false : true;
	};
}

function TreatmentShowCtrl($scope) {

}