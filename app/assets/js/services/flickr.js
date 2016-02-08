function FlickrService ($http, $filter) {
	var service = this;

	function formatDate (date) {
		var $date = $filter('date');
		var day = $date(date, 'd');
		var month = $date(date, 'MMM yyyy');
		var time = $date(date, 'HH:mm');
		var suffixes = {
			'1': 'st',
			'2': 'nd',
			'3': 'rd',
			'21': 'st',
			'22': 'nd',
			'23': 'rd',
			'31': 'st',
			'default': 'th'
		};

		return day + (suffixes[day] || suffixes.default) + ' ' + month + ' at ' + time;
	}

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
				return response.data.items.map(function(item) {
					item.author = item.author.replace(/nobody@flickr.com \((.+)\)/, '$1');
					item.published_formatted = formatDate(item.published);
					item.id = item.link.match(/\/(\d+)\/$/)[1];
					return item;
				});
			});
	};
}

angular
	.module('app')
	.service('flickrService', FlickrService);
