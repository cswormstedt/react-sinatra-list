var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var watch = require('gulp-watch');

gulp.task('react', function(){
return browserify('./clientReact/main.js')
        .transform('babelify', {presets: ["react"]})
        .bundle()
        .pipe(source('build.js'))
        .pipe(gulp.dest('./scripts/build'))
})

gulp.task('watch', function(){
  gulp.watch(['./clientReact/*.js'], ['react'])
})

gulp.task('default', ['react', 'watch'])
