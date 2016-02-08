describe('My app', function() {
	beforeEach(function() {
		browser.get('/');
	});

	it('should have a title', function() {
		var title = browser.getTitle();
		expect(title).toBeDefined();
		expect(title).toEqual('Angular Flickr App');
	});
});