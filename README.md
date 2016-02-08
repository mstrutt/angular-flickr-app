# angular-flickr-app

> http://angular-flickr-app.surge.sh/

[ ![Codeship Status for mstrutt/angular-flickr-app](https://codeship.com/projects/41cd6990-b0c5-0133-aa18-3674ea8aa855/status?branch=master)](https://codeship.com/projects/132803)

## Third parties

Any distributed dependencies are referenced in [bower.json](https://github.com/mstrutt/angular-flickr-app/blob/master/bower.json) and any development dependencies are included in [package.json](https://github.com/mstrutt/angular-flickr-app/blob/master/package.json).

## Devloping

- `npm install` to set up (requires node `4.x.x`)
- `gulp` to compile code and serve it to [localhost:9000](http://localhost:9000), then watch for changes
- dependencies: `bower` is used to manage website dependencies, `wiredep` adds these to `index.html`

## Building

- `gulp build` to create production-ready code

## Testing

Unit tests with Karma
- `npm run karma` to run continuously while developing
- `npm run karma-single-run` for use in ci and `npm test`

End-to-end tests with Protractor
- `npm run setup test` to start up webdriver (leave this running and open a new tab)
- `npm run protractor` for a run through of tests including the accessibility plugin

Linting
- `gulp lint`

## CI

All tests run with Codeship, if commits are to master then passing tests are deployed using [surge](https://surge.sh/) to [angular-flickr-app.surge.sh](http://angular-flickr-app.surge.sh/)
