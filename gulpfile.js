var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	eslint = require('gulp-eslint'),
	concat = require('gulp-concat'),
	ngAnnotate = require('gulp-ng-annotate'),
	connect = require('gulp-connect'),
	rev = require('gulp-rev'),
	minifyCss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	usemin = require('gulp-usemin'),
	del = require('del');

function handleError (err) {
	console.log(err.toString());
	this.emit('end');
}

gulp.task('build:preclean', function() {
	return del([
		'build'
	]);
});

gulp.task('build:css', function() {
	return gulp
		.src('app/assets/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', handleError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('app/assets/css'))
		.pipe(connect.reload());
});

gulp.task('build:js', function() {
	return gulp
		.src([
			'app/assets/js/main.js',
			'app/assets/js/{config,constants,run,controllers,directives,filters,interceptors,services}/*.js'
		])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(concat('app.js'))
		.pipe(ngAnnotate({
			single_quotes: true
		}).on('error', handleError))
		.pipe(gulp.dest('app/assets/js'))
		.pipe(connect.reload());
});

gulp.task('build:copy', ['build:preclean', 'build:css', 'build:js'], function() {
	return gulp
		.src([
			'app/**',
			'!app/assets/{scss,css,js,vendor}{,/**}'
		])
		.pipe(gulp.dest('build'));
});

gulp.task('build:assets', ['build:copy'], function() {
	return gulp
		.src('app/index.html')
		.pipe(usemin({
			css: [
				minifyCss(),
				rev()
			],
			js: [
				uglify(),
				rev()
			]
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('build', ['build:assets']);

gulp.task('lint', function() {
	return gulp
		.src([
			'gulpfile.js',
			'app/assets/js/{main,*/*}.js',
			'tests/{,e2e/,unit/}*.js',
		])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task('serve', ['build:css', 'build:js'], function() {
	connect.server({
		root: 'app',
		port: 9000,
		livereload: true,
		middleware: function() {
			var history = require('connect-history-api-fallback');
			return [history()];
		}
	});
});

gulp.task('reload', function() {
	return gulp
		.src('app/**/*.html')
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('app/assets/scss/{,*/_}*.scss', ['build:css']);
	gulp.watch('app/assets/js/{main,*/*}.js', ['build:js']);
	gulp.watch('app/{index,views/{,*/}*}.html', ['reload']);
});

gulp.task('default', ['serve', 'watch']);
