import gulp from 'gulp';

gulp.task('build-html', () => {
    gulp.src('examples/**/*.html')
        .pipe(gulp.dest('dist/examples'))
    ;
});
