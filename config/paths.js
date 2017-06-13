'use strict';

module.exports = {
    scripts: {
        entry: './src/js/app.js',
        output: './dist/js/',
        watch: ['./src/js/**/*.js', './src/js/**/*.jsx']
    },
    styles: {
        entry: './src/scss/app.scss',
        output: './dist/css/',
        watch: ['./src/scss/**/*.scss','./src/scss/**/*.css']
    },
    html: {
        entry: './src/index.html',
        output: './dist/',
        watch: './src/index.html'
    }
};