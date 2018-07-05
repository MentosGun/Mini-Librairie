import gulp from 'gulp';
import browserify from 'browserify';
import tsify from 'tsify';
import source from 'vinyl-source-stream';
import {createProject} from 'gulp-typescript';

let tsProject = createProject('tsconfig.json');

gulp.task('build-js', ['build-definition'], () => {
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

gulp.task('build-definition', () => {
  return tsProject.src()
    .pipe(tsProject()).dts
    .pipe(gulp.dest('dist/definition'))
  ;
});
