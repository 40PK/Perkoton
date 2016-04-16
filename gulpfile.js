var gulp = require( "gulp" );
var run = require( "gulp-run" );
var clean = require( "gulp-clean" );
var browserify = require( "browserify" );
var babelify = require('babelify');
var source = require( "vinyl-source-stream" );
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var prefixer = require('gulp-autoprefixer');

gulp.task( "clean", function (){

	return gulp.src( 'package', { read: false } )
			   .pipe( clean( { force : true } ) );

});

gulp.task( "browserify", [ "clean" ], function (){

	var bundler = browserify( "./browser/app.js" )
					.transform( babelify, { presets: [ "es2015", "react" ] } );

	return bundler.bundle()
		.pipe( source( "app.js" ) )
		.pipe( gulp.dest( "./package" ) );

} );


gulp.task( "build:html", [ "browserify" ], function (){

	return gulp.src( [ "browser/*.html", "browser/**/*.html" ], { base: "." } )
			   .pipe( gulp.dest( "package" ) );

} );

gulp.task( "build:styles", [ "build:html" ], function () {

    gulp.src( "browser/styles/*" ) 
        .pipe( sass() )
        .pipe( prefixer() ) 
        .pipe( concatCss( "main.css" ) )
        .pipe( cleanCSS() )
        .pipe( gulp.dest( "package/browser/" ) );

} );

gulp.task( "build", [ "build:styles" ], function (){

	return gulp.src( [ "app/**/*", "package.json" ], { base: "." } )
			   .pipe( gulp.dest( "package" ) );

} );

gulp.task( "run", function (){

	return run( "electron ./package" ).exec();

} );

gulp.task( "full", [ "build" ], function (){

	return run( "electron ./package" ).exec();
	
} );

