function FlickrService ($http, $q, $sce, $filter) {
	var service = this;
	var cache = {};

	function cacheData (items) {
		items.forEach(function(item) {
			cache[item.id] = item;
		});
	}

	service.formatDate = function(date) {
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
	};

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
				var items = response.data.items.map(function(item) {
					item.id = item.link.match(/\/(\d+)\/$/)[1];
					item.author = item.author.replace(/nobody@flickr.com \((.+)\)/, '$1');
					item.published_formatted = service.formatDate(item.published);
					item.tags = item.tags.split(' ');
					// First two paragraphs are always the poster and the photo
					item.description = $sce.trustAsHtml(item.description.replace(/^(\s*<p>.+?<\/p>\s*){2,2}/, '') || '<p class="placeholder">No description provided</p>');
					return item;
				});

				cacheData(items);
				return items;
			});
	};

	service.getPhotoById = function(id) {
		var cached = cache[id];

		if (cached) {
			return $q.when(cached);
		}

		return service
			.getFeed()
			.then(function(items) {
				var index;
				items.some(function(item, i) {
					var match = item.id === id
					if (match) {
						index = i;
					}
					return match;
				});
				return items[index];
			});
	};
}

angular
	.module('app')
	.service('flickrService', FlickrService);
