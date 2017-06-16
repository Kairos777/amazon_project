var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps');


var path = {
    build: {
        css: 'static/css/',
        img: 'static/img/',
    },
    src: {
        sass: 'assets/scss/*.scss',
        img: 'assets/img/**/*.*',
    },
    watch: {
        sass: 'assets/scss/**/*.scss',
        img: 'assets/img/**/*.*',
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

// IMAGES
gulp.task('image:build', function() {
    gulp.src(path.src.img)
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
    return gulp.src('build/images/**/*.*', {
        read: false
    })
        .pipe(clean())
});

gulp.task('build', [
    'style:build',
    'image:build',
]);

gulp.task('watch', function() {
    watch([path.watch.sass], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
});

gulp.task('default', ['build', 'watch']);
