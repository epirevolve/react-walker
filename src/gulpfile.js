const webpack = require('webpack');
const webpackStream = require("webpack-stream");
const gulp = require('gulp');
const path = require('path');

const config = require('/src_copy/webpack.config.js');

const process = require('process');
process.chdir('/src_copy');

const exec = require('child_process').exec;

gulp.task('babel', () => webpackStream(config, webpack).pipe(gulp.dest('.')));

const fs = require('fs');
const watchFiles = (dirpath) => {
    fs.readdir(dirpath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        for (const file of files) {
            const fp = path.join(dirpath, file);
            fs.stat(fp, (err, stats) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if (stats.isDirectory()) {
                    watchFiles(fp);
                } else {
                    if (fp.includes('node_modules')) return;
                    if (!fp.endsWith('js') && !fp.endsWith('jsx')) return;
                    // console.log(fp);
                    fs.watchFile(fp, (curr, prev) => {
                        console.log(`${fp} is changed.`);
                        const dst = fp.replace('src_origin', 'src_copy');
                        // console.log(dst);
                        fs.copyFileSync(fp, dst);
                        console.log('start babel...');
                        exec('gulp babel', (error, stdout, stderr) => {
                            if (error) console.error(error);
                            console.log(stdout);
                        });
                    });
                }
            });
        }
    });
}

const watchAction = () => {
    console.log('start watch...');
    const dirpath = '/src_origin';
    watchFiles(dirpath);
};

gulp.task('watch', () => watchAction());