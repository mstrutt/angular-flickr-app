function RoutingConfig ($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
		.state('list', {
			url: '/',
			controller: 'ListController as vm',
			resolve: ListController.resolve,
			templateUrl: 'views/list.html'
		})
		.state('detail', {
			url: '/photo/:author/:id',
			controller: 'DetailController as vm',
			resolve: DetailController.resolve,
			templateUrl: 'views/detail.html'
		});

	$urlRouterProvider.otherwise("/");

	$locationProvider.html5Mode(true);
}

angular
	.module('app')
	.config(RoutingConfig);
