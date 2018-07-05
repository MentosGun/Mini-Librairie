import gulp from 'gulp';
import {create} from 'browser-sync';

const browserSync = create();

gulp.task('serve', ['build-js', 'build-css', 'build-html'], () => {
    browserSync.init({
        server: './dist/examples',
    });

    gulp.watch('src/scripts/**/*', ['reload-js']);
    gulp.watch('examples/**/*.html', ['reload-html']);
});

gulp.task('reload-js', ['build-js'], (done) => {
    browserSync.reload();
    done();
});

gulp.task('reload-css', ['build-css'], (done) => {
    browserSync.reload();
    done();
});

gulp.task('reload-html', ['build-html'], (done) => {
    browserSync.reload();
    done();
});
