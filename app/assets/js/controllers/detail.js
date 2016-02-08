function DetailController (photo) {
	var vm = this;

	vm.photo = photo
}

DetailController.resolve = /* @ngInject */ {
	photo: function($stateParams, flickrService) {
		return flickrService
			.getPhotoById($stateParams.id);
	}
};

angular
	.module('app')
	.controller('DetailController', DetailController);
