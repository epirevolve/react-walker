const webpack = require('webpack');
const webpackStream = require("webpack-stream");
const gulp = require('gulp');

const config = require('/src/webpack.config.js');

const process = require('process');
process.chdir('/src');

const exec = require('child_process').exec;

// jsx babel
gulp.task('babel', () => webpackStream(config, webpack).pipe(gulp.dest('.')));

// change detection
gulp.task('watch', () => gulp.watch([ '/src/**/*.js', '/src/**/*.jsx', '!/src/**/*.min.js' ],
    {interval: 1000, usePolling: true, delay: 3000},
    exec('gulp babel', (err, stdout, stderr) => {
        if (err) { console.log(err); }
        console.log(stdout);
    })
));