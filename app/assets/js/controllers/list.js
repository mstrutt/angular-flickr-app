function ListController ($stateParams, $location, flickrService, feed) {
	var vm = this;

	vm.feed = feed;

	vm.tags = $stateParams.q;

	vm.search = function() {
		$location.search({
			q: vm.tags ? vm.tags : null
		});

		var tags = vm.tags ? vm.tags.split(' ') : [];

		flickrService
			.getFeed(tags)
			.then(function(newFeed) {
				vm.feed = newFeed;
			});
	};

	vm.searchOptions = {
		updateOn: 'default blur',
		debounce: {
			default: 300,
			blur: 0
		}
	};
}

ListController.resolve = /* @ngInject */ {
	feed: function($stateParams, flickrService) {
		var tags = $stateParams.q ? $stateParams.q.split(' ') : [];

		return flickrService
			.getFeed(tags);
	}	
};

angular
	.module('app')
	.controller('ListController', ListController);
