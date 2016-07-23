const gulp = require('gulp');
const prefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const react = require('gulp-react');
const run = require('gulp-run');
const sass = require('gulp-sass');
const gulpUnicode = require('gulp-sass-unicode');

gulp.task('clean', () => {
	return gulp.src('package', {read: false})
			   .pipe(clean({force: true}));
});

gulp.task('build:modules', ['clean'], () => {
	return gulp.src(['node_modules/react/**/*.*', 'node_modules/react-dom/**/*.*'], {base: '.'})
			   .pipe(gulp.dest('package'));
});

gulp.task('build:js', ['build:modules'], () => {
 	return gulp.src('browser/**/*.js', {base: '.'})
 			   .pipe(react({harmony: false, es6module: true}))
 			   .pipe(gulp.dest('package'));
})

gulp.task('build:html', ['build:js'], () => {
	return gulp.src(['browser/*.html', 'browser/**/*.html'], {base: '.'})
			   .pipe(gulp.dest('package'));
});

gulp.task('build:styles', ['build:html'], () => {
    gulp.src('browser/styles/**/*.{css,scss}')
        .pipe(sass())
        .pipe(gulpUnicode())
        .pipe(prefixer()) 
        .pipe(concatCss('main.css'))
        .pipe(cleanCSS({keepSpecialComments: 0}))
        .pipe(gulp.dest('package/browser/'));

});

gulp.task('build:fonts', ['build:styles'], () => {
	return gulp.src(['browser/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}'], {base: '.'})
			   .pipe(gulp.dest('package'));
});

gulp.task('build', ['build:fonts'], () => {
	return gulp.src(['app/**/*', 'package.json'], {base: '.'})
			   .pipe(gulp.dest('package'));
});

gulp.task('run', () => {
	return runApp();
});

gulp.task('full', ['build'], () => {
	return runApp();
});

gulp.task('package', () => {
	return run('electron-packager ./package Perkoton --platform=darwin --arch=x64 --out ./build --overwrite --icon=./icons/mac.icns').exec();
});

function runApp (){
	return run('electron ./package').exec();
}
