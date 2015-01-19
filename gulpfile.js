// Gulp Requires
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    rjs = require('gulp-requirejs'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

// Node requires for exec and sys
var exec = require('child_process').exec,
    sys = require('sys');



// Directories
var SRC = 'app',
    DIST = 'public/dist';



// SCSS Compiling and Minification
//
//
gulp.task('scss', function(){
  return gulp.src(SRC + '/assets/scss/app.scss')
    .pipe(
      sass({
        outputStyle: 'expanded',
        debugInfo: true,
        lineNumbers: true,
        errLogToConsole: true,
        onSuccess: function(){
          notify().write({ message: "SCSS Compiled successfully!" });
        },
        onError: function(err) {
          gutil.beep();
          notify().write(err);
        }
      })
    )
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe( gulp.dest(DIST + '/css') )
    .pipe(livereload(server)
    );
});




// Image Minification
gulp.task('image-min', function () {
    return gulp.src( SRC + 'assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest( DIST + '/images' ));
});

gulp.task('jsNotify', function() {
    notify().write({ message: "JS Compiled successfully!" });
});

//move vendor files
gulp.task('movejsVendor', function() {
  return gulp.src( SRC + '/assets/js/vendor/*.js')
    .pipe(uglify())
    .pipe((gulp.dest( DIST + '/js/vendor/')));

});

//move require modules
gulp.task('movejsModules', function() {
  return gulp.src( SRC + '/assets/js/app.js')
    .pipe(uglify())
    .pipe((gulp.dest( DIST + '/js/')));

});

// Clean dist directory for rebuild
gulp.task('clean', function() {
  return gulp.src(DIST, {read: false})
    .pipe(clean());
});



// Do the creep, ahhhhhhh!
gulp.task('watch', function() {

  // Listen on port 35729
  server.listen(44445, function (err) {

    // Watch .scss files
    gulp.watch(SRC + '/assets/scss/**/*.scss', ['scss']);
    // Watch image files
    gulp.watch( SRC + '/assets/images/**/*', ['image-min']);
    // Watch js files
    gulp.watch( SRC + '/assets/js/**/*', ['jsBuild']);
  });

});


// Gulp Default Task
gulp.task('jsBuild', ['movejsVendor', 'movejsModules' ,'jsNotify']);
gulp.task('default', ['scss', 'watch', 'image-min', 'jsBuild']);
