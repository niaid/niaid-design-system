/* Gulp File
    Last Modified by: Jacob Caccamo
    October 9, 2020
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

// GULP: buildProd - Compile your project assets and build public_html folder for deploy.
gulp.task('buildProd', gulp.series(compileSass, compileJS, compilePatternLab, buildDist));

// buildDist - Build public_html folder for deploy.
function buildDist() {
    var pages = [];
    gulp.src('./source/_patterns/06-dist/*.twig').pipe(tap(function(file, t) {
        if (file.path.split('source/').length > 1) {
            let pageFile = file.path.split('source/_patterns/06-dist/')[1];
            let pageName = pageFile.split('.twig')[0];
            pages.push(pageName);
        }
        else {
            var path = file.path.split("\\source\\_patterns\\06-dist\\");
        }
    }));

    // var buildPaths = [
    //     {
    //         "page_name": "PAGE_NAME_IN_06_DIST",
    //         "target_dest": "./public_html/TARGET_PATH/"
    //     }
    // ];

    // Move HTML to Proper Positions
    for (let i = 0; i < pages.length; i++) {
        var path = "./public/patterns/06-dist-" + pages[i] + "-" + buildPaths[i] + "/06-dist-" + buildPaths[i] + "-" + buildPaths[i] + ".html";
        gulp.src(path)
            .pipe(rename({
                basename: 'index',
                extname: '.html'
            }))
            .pipe(gulp.dest(buildPaths[i].target_dest));
    }

    // // Copy CSS
    // console.log("Starting Copy of CSS");
    // gulp.src('./source/css/nds-min.css')
    //     .pipe(gulp.dest('./public_html/css'));
    // gulp.src('./source/css/libraries/*.css')
    //     .pipe(gulp.dest('./public_html/css/libraries'));
    // console.log("Finished Copying CSS");
    // // Fix USWDS Image Paths
    // gulp.src('./public_html/css/libraries/uswds/uswds-banner.min.css')
    //     .pipe(replace('../img/', '../images/global/uswds/'))
    //     .pipe(gulp.dest('./public_html/css/libraries/uswds/'));

    // // Copy JS
    // console.log("Starting Copy of JS");
    // gulp.src('./source/js/**/*')
    //     .pipe(gulp.dest('./public_html/js'));
    // console.log("Finished Copying JS");

    // // Copy Images
    // console.log("Starting Copy of Images");
    // gulp.src('./source/images/**/*')
    //     .pipe(gulp.dest('./public_html/assets'));
    // console.log("Finished Copying Images");

    // // Copy Fonts
    // console.log("Starting Copy of Fonts");
    // return gulp.src('./source/webfonts/**/*')
    //     .pipe(gulp.dest('./public_html/webfonts'));
}