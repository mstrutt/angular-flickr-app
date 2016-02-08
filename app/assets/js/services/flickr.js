function FlickrService ($http) {
	var service = this;

	service.getFeed = function() {
		return $http({
			method: 'JSONP',
			url: 'https://api.flickr.com/services/feeds/photos_public.gne',
			params: {
				tags: 'potato',
				tagmode: 'all',
				format: 'json',
				jsoncallback: 'JSON_CALLBACK'
			}
		})
			.then(function(response) {
				return response.data;
			});
	};
}

angular
	.module('app')
	.service('flickrService', FlickrService);
