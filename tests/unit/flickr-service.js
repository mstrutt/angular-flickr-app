describe('flickrService', function() {
	var flickrService;
	var $httpBackend;
	var $rootScope;

	beforeEach(module('app'));

	describe('flickrService.formatDate', function() {
		beforeEach(inject(function(_flickrService_) {
			flickrService = _flickrService_;
		}));

		it('formats and machine readable date to be more human readable', function() {
			expect(flickrService.formatDate('2016-02-08T16:21:21Z')).toEqual('8th Feb 2016 at 16:21');
			expect(flickrService.formatDate('2015-01-01T12:34:56Z')).toEqual('1st Jan 2015 at 12:34');
		});
	});

	describe('flickerService.getFeed', function() {
		var getFeedHandler;

		beforeEach(inject(function(_$rootScope_, _$httpBackend_, _flickrService_) {
			$rootScope = _$rootScope_;
			$httpBackend = _$httpBackend_;
			flickrService = _flickrService_;

			getFeedHandler = $httpBackend
				.expectJSONP(/.+api\.flickr\.com.+/)
				.respond({
					items: flickrFeedRaw
				});
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('transforms the response', function() {
			var feedResponse;

			flickrService
				.getFeed()
				.then(function(_feedResponse_) {
					feedResponse = _feedResponse_;
				});

			$httpBackend.flush();
			$rootScope.$apply();

			expect(feedResponse).toBeDefined();
			expect(feedResponse).not.toEqual(flickrFeedRaw);
		});

		describe('the transformation', function() {
			var raw;
			var formatted;

			beforeEach(function() {
				flickrService
					.getFeed()
					.then(function(_feedResponse_) {
						raw = flickrFeedRaw[0]
						formatted = _feedResponse_[0];
					});

				$httpBackend.flush();
				$rootScope.$apply();
			});

			it('assigns an id', function() {
				expect(formatted.id).toBeDefined();
			})

			it('cleans up the author', function() {
				expect(formatted.author).not.toContain('nobody@flickr.com');
			});

			it('formats the published date', function() {
				expect(formatted.published_formatted).toBeDefined();
				expect(formatted.published_formatted).toEqual(flickrService.formatDate(raw.published));
			});

			it('splits tags up into an array', function() {
				expect(typeof formatted.tags).toBe('object');
			});
		});
	});
});
