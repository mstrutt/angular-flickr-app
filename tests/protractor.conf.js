exports.config = {
	allScriptsTimeout: 11000,

	specs: [
		'e2e/*.js'
	],

	capabilities: {
		browserName: 'chrome'
	},

	baseUrl: 'http://localhost:9000',

	seleniumAddress:'http://127.0.0.1:4444/wd/hub',

	framework: 'jasmine2',

	plugins: [
		{
			package: 'protractor-accessibility-plugin',
			chromeA11YDevTools: {
				treatWarningsAsFailures: true
			}
		}
	],

	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};
