import gulp from 'gulp';
import browserify from 'browserify';
import tsify from 'tsify';
import source from 'vinyl-source-stream';

gulp.task('build-js', () => {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/index.ts'],
        cache: {},
        packageCache: {},
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(gulp.dest('dist/lib'));
});
