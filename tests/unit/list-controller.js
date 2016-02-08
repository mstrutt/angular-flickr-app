describe('ListController', function() {
	var $controller;
	var vm;

	beforeEach(module('app'));

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	describe('vm.feed', function() {
		beforeEach(function() {
			vm = new $controller('ListController', {feed: flickrFeed});
		});

		it('is bound to the feed provided', function() {
			expect(vm.feed).toEqual(flickrFeed);
		});

		it('is the correct length', function() {
			expect(vm.feed.length).toBe(5);
		});
	});

	describe('vm.tags', function() {
		it('is bound to the state param', function() {
			vm = new $controller('ListController', {
				feed: flickrFeed,
				$stateParams: {
					q: 'chips salad'
				}
			});

			expect(vm.tags).toBe('chips salad');
		})
	})
});
