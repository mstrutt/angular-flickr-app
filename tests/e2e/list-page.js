describe('List page', function() {
	var feed;

	beforeEach(function() {
		browser.get('/');
		feed = element.all(by.css('.post'));
	});

	it('has a feed', function() {
		feed.then(function(items) {
			expect(items.length > 0).toBeTruthy();
		});
	});

	describe('each result', function() {
		beforeEach(function() {
			browser.get('/');
		});

		it('has a title', function() {
			feed.each(function(item) {
				var title = item.element(by.css('.post__title')).getText();
				expect(title).toBeDefined();
				expect(title).not.toEqual('');
			});
		});

		it('links to a details page', function() {
			feed.each(function(item) {
				var href = item.element(by.css('.post__thumb')).getAttribute('href');
				expect(href).toMatch(/.+\/photo\/.+\/\d+\/?$/);
			});
		});
	});
});
