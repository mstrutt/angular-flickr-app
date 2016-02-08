describe('DetailController', function() {
	var $controller;
	var vm;

	beforeEach(module('app'));

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	describe('vm.photo', function() {
		beforeEach(function() {
			vm = new $controller('DetailController', {photo: photoData});
		});

		it('is bound to the data provided', function() {
			expect(vm.photo).toEqual(photoData);
		});
	});
});
