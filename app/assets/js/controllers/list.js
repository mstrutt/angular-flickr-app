function ListController (feed) {
	var vm = this;

	vm.feed = feed;
}

ListController.resolve = /* @ngInject */ {
	feed: function(flickrService) {
		return flickrService
			.getFeed();
	}	
};

angular
	.module('app')
	.controller('ListController', ListController);
