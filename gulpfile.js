var gulp = require( "gulp" );
var run = require( "gulp-run" );
var clean = require( "gulp-clean" );
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var prefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var react = require('gulp-react');
var gulpUnicode = require('gulp-sass-unicode');

gulp.task( "clean", function (){

	return gulp.src( 'package', { read: false } )
			   .pipe( clean( { force : true } ) );

});

gulp.task( "build:modules", [ "clean" ], function (){
	return gulp.src( [ "node_modules/react/**/*.*",
					   "node_modules/react-dom/**/*.*" ], { base: "." } )
			   .pipe( gulp.dest( "package" ) );
});

gulp.task( "build:js", [ "build:modules" ], function(){
 	return gulp.src( "browser/**/*.js", { base: "." } )
 			   .pipe( react({harmony: false, es6module: true}) )
 			   .pipe( babel( {
					presets: ['es2015']
				} ) )
 			   .pipe( gulp.dest( "package" ) );
})

gulp.task( "build:html", [ "build:js" ], function (){

	return gulp.src( [ "browser/*.html", "browser/**/*.html" ], { base: "." } )
			   .pipe( gulp.dest( "package" ) );

} );

gulp.task( "build:styles", [ "build:html" ], function () {

    gulp.src( "browser/styles/**/*.{css,scss}" )
        .pipe( sass() )
        .pipe( gulpUnicode() )
        .pipe( prefixer() ) 
        .pipe( concatCss( "main.css" ) )
        .pipe( cleanCSS( { keepSpecialComments : 0 } ) )
        .pipe( gulp.dest( "package/browser/" ) );

} );

gulp.task( "build:fonts", [ "build:styles" ], function (){

	return gulp.src( [ "browser/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}" ], { base: "." } )
			   .pipe( gulp.dest( "package" ) );

} );

gulp.task( "build", [ "build:fonts" ], function (){

	return gulp.src( [ "app/**/*", "package.json" ], { base: "." } )
			   .pipe( gulp.dest( "package" ) );

} );

gulp.task( "run", function (){

	return runApp();

} );

gulp.task( "full", [ "build" ], function (){

	return runApp();
	
} );

gulp.task( "package", function (){

	return run( "electron-packager ./package Perkoton --platform=darwin --arch=x64 --out ~/Desktop --overwrite --icon=./icons/mac.icns" ).exec();

} );

function runApp (){

	return run( "electron ./package" ).exec();

}
