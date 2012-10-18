'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
value('version', '0.1');


angular.module('zuserServices', ['ngResource']).factory('Zuser', function ($resource) {
	return $resource('/api/zuser/:id', {
		id : '@alias'
	}, {
		update : {
			method : 'PUT'
		},
		page : {
			method : 'GET'
		},
		myfind :{
			method:'POST'
		},
		sendSms :{
			method:'POST'
		}
	});
});

