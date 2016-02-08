describe('Detail page', function() {
	beforeEach(function() {
		browser.get('/')
			.then(function() {
				return element.all(by.css('.post__thumb')).first().click();
			});
	});

	it('has a title', function() {
		var title = element(by.css('.detail__title')).getText();
		expect(title).toBeDefined();
		expect(title).not.toEqual('');
	});

	it('links back to the feed', function() {
		var back = element(by.css('.detail__back'));
		var detailUrl;

		browser
			.getCurrentUrl()
			.then(function(url) {
				detailUrl = url;
				return back.click();
			})
			.then(function() {
				return element.all(by.css('.post'));
			})
			.then(function(feed) {
				var currentUrl = browser.getCurrentUrl();
				expect(currentUrl).not.toMatch(detailUrl);
				expect(currentUrl).toMatch(browser.baseUrl);
				expect(feed.length > 0).toBeTruthy();
			});
	});
});
