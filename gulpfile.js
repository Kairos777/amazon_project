var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps');


var path = {
    build: {
        css: 'static/css/',
    },
    src: {
        sass: 'assets/scss/*.scss',
    },
    watch: {
        sass: 'assets/scss/**/*.scss',
    }
};

// CSS
gulp.task('style:build', function() {
    gulp.src(path.src.sass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
    return gulp.src('build/css/*.css', {
            read: false
        })
});

gulp.task('build', [
    'style:build',
]);

gulp.task('watch', function() {
    watch([path.watch.sass], function(event, cb) {
        gulp.start('style:build');
    });
});

gulp.task('default', ['build', 'watch']);
