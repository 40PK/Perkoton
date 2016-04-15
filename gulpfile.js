var gulp = require( "gulp" );
var run = require( "gulp-run" );
var clean = require( "gulp-clean" );
var react = require( "gulp-react" );
var sourcemaps = require( "gulp-sourcemaps" );
var browserify = require( "browserify" );
var babelify = require('babelify');
var source = require( "vinyl-source-stream" );

gulp.task( "clean", function (){

	return gulp.src( 'package', { read: false } )
			   .pipe( clean( { force : true } ) );

});

gulp.task( 'browserify', [ "clean" ], function (){

	var bundler = browserify( './browser/app.js' )
					.transform( babelify, { presets: [ "es2015", "react" ] } );

	return bundler.bundle()
		.pipe( source( 'app.js' ) )
		.pipe( gulp.dest( './package' ) );

} );


gulp.task( "build:jsx", [ "browserify" ], function (){

	return gulp.src( [ 'browser/*.jsx', 'browser/**/*.jsx' ], { base: "." } )
			   .pipe( sourcemaps.init() )
			   .pipe( react() )
			   .pipe( sourcemaps.write('.') )
			   .pipe( gulp.dest( "package" ) );

} );

gulp.task( "build:html", [ "build:jsx" ], function (){

	return gulp.src( [ 'browser/*.html', 'browser/**/*.html' ], { base: "." } )
			   .pipe( gulp.dest( "package" ) );

} );

gulp.task( "build", [ "build:html" ], function (){

	return gulp.src( [ 'app/**/*', 'package.json' ], { base: "." } )
			   .pipe( gulp.dest( "package" ) );

} );

gulp.task( "run", function (){

	return run( "electron ./package" ).exec();

} );

gulp.task( "full", [ "build" ], function (){

	return run( "electron ./package" ).exec();
	
} );

