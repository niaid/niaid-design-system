/* Gulp File
    Last Modified by: Jacob Caccamo
    March 12, 2020
*/

const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const tap = require('gulp-tap');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const browserSync = require('browser-sync').create();
const exec = require('child_process').exec;
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const htmlreplace = require('gulp-html-replace');
const del = require('del');

// copyFonts - Copy Font Awesome from node_modules into project.
function copyFonts() {
    return gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('./source/webfonts/font-awesome'));
}

// compileSass - Compile CSS for your static site.
function compileSass() {
    console.log("Compiling Sass...");
    return gulp.src('source/css/style.scss')
        .pipe(sassGlob())
        .pipe(concat('nds.css'))
        .pipe(rename({
            basename: 'nds-min',
            extname: '.css'
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ["./node_modules/bootstrap/scss", "./node_modules/font-awesome/scss"]
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./source/maps'))
        .pipe(gulp.dest('./source/css'));
}

// compileJS - Compile JS for your static site.
// This logic replaces any scripts on build in the 00-nds folder with scripts of the same name in the custom directories (01-atoms, etc.).
var includedJS = ['./source/js/utilities/utilities.js'];
gulp.task('computeIncludedJSFiles', function() {
    var overridesJS = [];
    return gulp.src('./source/_patterns/**/*.js').pipe(tap(function(file, t) {
        if (file.path.split('source/').length > 1) {
            var parsedPath = file.path.split('source/')[1];
        }
        else {
            var parsedPath = file.path.split("source\\")[1];
        }
        if (!parsedPath.includes('00-nds')) {
            overridesJS.push(parsedPath);
            includedJS.push('./source/' + parsedPath);
        }
        else {
            var include = true;
            for (var i = 0; i < overridesJS.length; i++) {
                console.log(overridesJS[i].split('_patterns')[1]);
                if (parsedPath.includes(overridesJS[i].split('_patterns')[1])) {
                    include = false;
                }
            }
            if (include) {
                console.log("Including");
                includedJS.push('./source/' + parsedPath);
            }
        }
    }));
});
function compileJS() {
    console.log(includedJS);
    console.log("Compiling JS...");
    return gulp.src(includedJS, {base: './source/'})
        .pipe(concat('nds.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify())
        .pipe(sourcemaps.write('./source/js/global/'))
        .pipe(gulp.dest('./source/js/global/'));
}

// compilePatternLab - Compile Pattern Lab for your static site.
function compilePatternLab(cb) {
    console.log("Compiling Pattern Lab...")
    return exec('php core/console --generate', function(err, stdout, stderr) {
        browserSync.reload();
        cb(err);
    });
}

// cleanDistributionDirectories - Cleans out any distribution items before a fresh build is created.
gulp.task('cleanDistributionDirectories', (cb) => {
    let dirs = [
        './public_html/**/*'
    ];
    return del(dirs, {'force': true}, cb);
});

// GULP: serveProject - Serves project locally and watches files for changes.
gulp.task('serveProject', function() {
    browserSync.init({
        server: {
            baseDir: './',
        },
        startPath: './public/',
        open: true
    });

    gulp.watch(['./source/_patterns/**/*', './source/css/**/*.scss'], gulp.series(compileSass, compileJS, compilePatternLab));
});

// GULP: default - Running gulp compiles the your static site and serves it locally.
gulp.task('default', gulp.series(copyFonts, compileSass, 'computeIncludedJSFiles', compileJS, compilePatternLab, 'serveProject'));

// GULP: build - Compile your project assets and build public_html folder for deploy.
gulp.task('build', gulp.series('cleanDistributionDirectories', compileSass, compileJS, compilePatternLab, computePaths, moveAssets));

// computePaths - Creates distribution paths based on page name and location.
var pages = [];
function computePaths() {
    return gulp.src('./source/_patterns/05-pages/**/*.twig').pipe(tap(function(file, t) {
        if (file.path.split('source/').length > 1) {
            addPage(file.path);
        }
        else {
            let escaped = file.path.replace(/\\/g, "/");
            addPage(escaped);
        }
    }));
}

// addPage - Helper function for the computePaths() function. Determines the path and destination of the page.
function addPage(file) {
    let distPath = file.split('source/_patterns/05-pages/')[1];
    let fileName = distPath.split('/'), targetPath;
    fileName = fileName[fileName.length - 1];
    if (distPath === fileName) { targetPath = "/"; } else { targetPath = distPath.split('/' + fileName)[0]; }
    pages.push({ "depth": distPath.split("/").length - 1, "pageName": fileName.split('.twig')[0], "patternLabPath": targetPath.replace('/', '-'), "targetPath": targetPath });
    return;
}

// moveAssets - Move all distribution assets to the public_html/ folder.
function moveAssets() {
    // Move HTML to Proper Positions
    for (let i = 0; i < pages.length; i++) {
        // Build Relative Path
        let relativePath = ""; if (pages[i].depth === 0) { relativePath = "./"; } else { for (let j = 0; j < pages[i].depth; j++) { relativePath += "../"; }}

        if (pages[i].targetPath === "/") {
            var path = "./public/patterns/05-pages-index/05-pages-index.html";
            gulp.src(path)
                .pipe(rename({ basename: 'index', extname: '.html' }))
                .pipe(replace('../../css', relativePath + 'css'))
                .pipe(replace('../../js', relativePath + 'js'))
                .pipe(replace('../../images', relativePath + 'assets'))
                .pipe(replace('../../assets', relativePath + 'assets'))
                .pipe(htmlreplace({ remove : '' }))
                .pipe(gulp.dest('./public_html/'));
        }
        else {
            var path = "./public/patterns/05-pages-" + pages[i].patternLabPath + "-" + pages[i].pageName + "/05-pages-" + pages[i].patternLabPath + "-" + pages[i].pageName + ".html";
            gulp.src(path)
                .pipe(rename({ basename: 'index', extname: '.html' }))
                .pipe(replace('../../css', relativePath + 'css'))
                .pipe(replace('../../js', relativePath + 'js'))
                .pipe(replace('../../images', relativePath + 'assets'))
                .pipe(replace('../../assets', relativePath + 'assets'))
                .pipe(htmlreplace({ remove : '' }))
                .pipe(gulp.dest('./public_html/' + pages[i].targetPath));
        }
    }

    // Copy CSS
    console.log("Copy CSS");
    gulp.src('./source/css/nds-min.css')
        .pipe(gulp.dest('./public_html/css'));
    gulp.src('./source/css/libraries/*.css')
        .pipe(gulp.dest('./public_html/css/libraries'));

    // Copy JS
    console.log("Copy JS");
    gulp.src('./source/js/**/*')
        .pipe(gulp.dest('./public_html/js'));

    // Copy Images
    console.log("Copy Images");
    gulp.src('./source/images/**/*')
        .pipe(gulp.dest('./public_html/assets'));

    // Copy Fonts
    console.log("Copy Fonts");
    return gulp.src('./source/webfonts/**/*')
        .pipe(gulp.dest('./public_html/webfonts'));
}