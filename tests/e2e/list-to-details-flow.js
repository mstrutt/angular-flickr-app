describe('Seeing details for the first post', function() {
	var firstPost = element.all(by.css('.post')).first();

	beforeEach(function() {
		browser.get('/');
	});

	it('loads the right url', function() {
		var thumb = firstPost.element(by.css('.post__thumb'));
		var url = thumb.getAttribute('href');

		thumb
			.click()
			.then(function() {
				expect(browser.getCurrentUrl()).toMatch(url);
			});
	});

	it('has the same post title', function() {
		var thumb = firstPost.element(by.css('.post__thumb'));
		var name = firstPost.element(by.css('.post__title')).getText();

		thumb
			.click()
			.then(function() {
				expect(element(by.css('.detail__title')).getText()).toEqual(name);
			});
	});
});
