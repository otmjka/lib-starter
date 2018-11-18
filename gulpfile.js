"use strict";

const gulp = require('gulp');

const mseDepsList = [
  'dist/.js'
];

const mseDepsOutput = '..///flu/reactapp/lib/';

gulp.task('cp:flu', function() {
  return gulp.src(mseDepsList)
    .pipe(gulp.dest(mseDepsOutput));
});

const webrtcOutput = '..///';

gulp.task('cp:webrtc', function() {
  return gulp.src(mseDepsList)
    .pipe(gulp.dest(webrtcOutput));
});

const exampleSimpleOutput = 'examples/simple/public/';

gulp.task('cp:example:simple', function() {
  return gulp.src(mseDepsList)
    .pipe(gulp.dest(exampleSimpleOutput));
});

gulp.task('cp',
  gulp.parallel('cp:flu', 'cp:webrtc', 'cp:example:simple'))

gulp.watch('dist/**/*', gulp.series('cp'))
