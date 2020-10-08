/* Gulp File
    Last Modified by: Jacob Caccamo
    September 30, 2020
*/

const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const tap = require('gulp-tap');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const browserSync = require('browser-sync').create();
const exec = require('child_process').exec;
const babel = require('gulp-babel');
const cache = require('gulp-cache');
const change = require('gulp-change');
const fileinclude = require('gulp-file-include');
const zip = require('gulp-zip');
const del = require('del');

/* Fonts */
function copyFonts() {
    return gulp.src('../global-assets/source/webfonts/**/*')
        .pipe(gulp.dest('./source/webfonts/'));
}

/* SASS */
function compileSass() {
    console.log("Compiling Sass...");
    return gulp.src('source/css/style.scss')
        .pipe(sassGlob())
        .pipe(concat('style.css'))
        .pipe(rename({
            basename: 'style',
            extname: '.css'
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ["./node_modules/bootstrap/scss", "./node_modules/font-awesome/scss"]
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./source/maps'))
        .pipe(gulp.dest('./source/css'))
        .pipe(cache.clear())
        .pipe(browserSync.stream());
}

function copyGlobalSass() {
    console.log("Transferring Assets from Global SASS...");
    gulp.src('../global-assets/source/css/style.scss').pipe(gulp.dest('./source/css/'));
    gulp.src('../global-assets/source/css/libraries/**/*').pipe(gulp.dest('./source/css/libraries/'));
    return gulp.src('../global-assets/source/css/global/**/*').pipe(gulp.dest('./source/css/global/'));
}

/* Patterns */
function compilePatternLab(cb) {
    console.log("Compiling Pattern Lab...")
    return exec('php core/console --generate', function(err, stdout, stderr) {
        cache.clearAll();
        browserSync.reload();
        cb(err);
    });
}

function cleanNDS() {
    return del('./source/_patterns/00-nds/**/*', {force:true});
}

function copyGlobalPatterns() {
    console.log("Transferring Assets from Global Patterns...");
    console.log("Copying Patterns...");
    return gulp.src('../global-assets/source/_patterns/00-nds/**/*').pipe(gulp.dest('./source/_patterns/00-nds/'));
}

var includedJS = [];
gulp.task('computeIncludedJSFiles', function() {
    var overridesJS = [];
    return gulp.src('./source/_patterns/**/*.js').pipe(tap(function(file, t) {
        var parsedPath = file.path.split('source/')[1];
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

/* JS */
function compileJS() {
    console.log(includedJS);
    console.log("Compiling JS...");
    return gulp.src(includedJS, {base: './source/'})
        .pipe(concat('script.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify())
        .pipe(sourcemaps.write('./source/js/global/'))
        .pipe(gulp.dest('./source/js/global/'));
}

function copyGlobalJS() {
    console.log("Transferring Assets from Global JS...");
    return gulp.src('../global-assets/source/js/**/*').pipe(gulp.dest('./source/js/'));
}

// Images
function copyGlobalImages() {
    console.log("Transferring Assets from Global Images...");
    return gulp.src('../global-assets/source/images/**/*').pipe(gulp.dest('./source/images/'));
}

// Watching Source Files
gulp.task('serveProject', function() {
    browserSync.init({
        server: {
            baseDir: './',
        },
        startPath: './public/',
        open: true
    });

    gulp.watch(['./source/_patterns/01-atoms/**/*', './source/_patterns/02-molecules/**/*', './source/_patterns/03-organisms/**/*', './source/_patterns/04-sections/**/*', './source/_patterns/05-pages/**/*'], gulp.series(compileSass, compileJS, compilePatternLab));
    gulp.watch('../global-assets/source/css/**/*', gulp.series(copyGlobalSass, compileSass, compilePatternLab));
    gulp.watch('../global-assets/source/js/**/*', gulp.series(copyGlobalJS, compileJS, compilePatternLab));
    gulp.watch('../global-assets/source/_patterns/**/*', gulp.series(cleanNDS, copyGlobalPatterns, compileSass, compileJS, compilePatternLab));
});

// Need to add copyNodeModules
gulp.task('default', gulp.series(copyFonts, copyGlobalImages, copyGlobalSass, copyGlobalJS, cleanNDS, copyGlobalPatterns, compileSass, 'computeIncludedJSFiles', compileJS, compilePatternLab, 'serveProject'));

// Define Paths to Compiled Pages & Desired Distribution Paths
var buildPaths = [{
        "page_name": "index",
        "target_dest": "./public_html/"
    },
    {
        "page_name": "design",
        "target_dest": "./public_html/design/"
    },
    {
        "page_name": "development",
        "target_dest": "./public_html/development"
    },
    {
        "page_name": "builder",
        "target_dest": "./public_html/builder"
    },
    {
        "page_name": "getting-started",
        "target_dest": "./public_html/getting-started"
    },
    {
        "page_name": "components",
        "target_dest": "./public_html/components"
    }
];

// buildProd Task Definition
gulp.task('buildProd', gulp.series(compileSass, 'computeIncludedJSFiles', compileJS, compilePatternLab, moveAssets, cleanDist, compileGlobalAssets, dist_copyFonts, dist_copyGlobalImages, dist_copyGlobalSass, dist_copyGlobalJS, dist_copyGlobalPatterns, dist_copyOther, zipDist));

// Move Assets to the public_html Folder for Deployment
function moveAssets() {
    // Move HTML to Proper Positions
    for (var i = 0; i < buildPaths.length; i++) {
        var path = "./public/patterns/06-dist-" + buildPaths[i].page_name + "-" + buildPaths[i].page_name + "/06-dist-" + buildPaths[i].page_name + "-" + buildPaths[i].page_name + ".html";
        gulp.src(path)
            .pipe(rename({
                basename: 'index',
                extname: '.html'
            }))
            .pipe(gulp.dest(buildPaths[i].target_dest));
    }

    // Copy CSS
    console.log("Starting Copy of CSS");
    gulp.src('./source/css/style.css')
        .pipe(gulp.dest('./public_html/css'));
    gulp.src('./source/css/builder.css')
        .pipe(gulp.dest('./public_html/css'));
    gulp.src('./source/css/libraries/*.css')
        .pipe(gulp.dest('./public_html/css/libraries'));
    console.log("Finished Copying CSS");

    // Copy JS
    console.log("Starting Copy of JS");
    gulp.src('./source/js/**/*')
        .pipe(gulp.dest('./public_html/js'));
    console.log("Finished Copying JS");

    // Copy Images
    console.log("Starting Copy of Images");
    gulp.src('./source/images/**/*')
        .pipe(gulp.dest('./public_html/assets'));
    console.log("Finished Copying Images");

    // Copy Assets
    console.log("Starting Copy of Assets");
    gulp.src('./source/assets/**/*')
        .pipe(gulp.dest('./public_html/assets'));
    console.log("Finished Copying Assets");

    // Copy Webfonts
    console.log("Starting Copy Webfonts");
    return gulp.src('./source/webfonts/**/*')
        .pipe(gulp.dest('./public_html/webfonts'));
}

// compileGlobalAssets - A function to concatenate and compile the component CSS and JS files into single .css and .js distribution files.
function compileGlobalAssets() {
    // SASS
    gulp.src('../global-assets/source/css/style.scss')
        .pipe(sassGlob())
        .pipe(concat('style.css'))
        .pipe(rename({
            basename: 'style',
            extname: '.css'
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ["../global-assets/node_modules/bootstrap/scss", "../global-assets/node_modules/font-awesome/scss"]
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('../global-assets/source/maps'))
        .pipe(gulp.dest('../global-assets/source/css'))
        .pipe(cache.clear())
        .pipe(browserSync.stream());

    // JS
    return gulp.src('../global-assets/source/_patterns/**/*.js')
        .pipe(concat('script.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify())
        .pipe(sourcemaps.write('../global-assets/source/js/global/'))
        .pipe(gulp.dest('../global-assets/source/js/global/'));
}

// Move Assets to Dist for Zip

function cleanDist() {
    del('../nds-drupal-theme/nds/**/*', {force:true});
    return del('../global-assets/dist/**', {force:true});
}

function dist_copyFonts() {
    return gulp.src('../global-assets/source/webfonts/**/*')
        .pipe(gulp.dest('../global-assets/dist/source/webfonts/'));
}

function dist_copyGlobalSass() {
    console.log("Transferring Assets from Global SASS...");
    gulp.src('../global-assets/source/css/style.scss').pipe(gulp.dest('../global-assets/dist/source/css/'));
    gulp.src('../global-assets/source/css/style.css').pipe(gulp.dest('../global-assets/dist/source/css/'));
    gulp.src('../global-assets/source/css/libraries/**/*').pipe(gulp.dest('../global-assets/dist/source/css/libraries/'));
    gulp.src('../global-assets/source/css/overrides/**/*').pipe(gulp.dest('../global-assets/dist/source/css/overrides/'));
    return gulp.src('../global-assets/source/css/global/**/*').pipe(gulp.dest('../global-assets/dist/source/css/global/'));
}

function dist_copyGlobalPatterns() {
    console.log("Transferring Assets from Global Patterns...");
    console.log("Copying Data...");
    gulp.src('../global-assets/source/_data/**/*').pipe(gulp.dest('../global-assets/dist/source/_data/'));
    console.log("Copying Meta...");
    gulp.src('../global-assets/source/_meta/**/*').pipe(gulp.dest('../global-assets/dist/source/_meta/'));
    console.log("Copying Patterns...");
    return gulp.src('../global-assets/source/_patterns/**/*').pipe(gulp.dest('../global-assets/dist/source/_patterns/'));
}

function dist_copyGlobalJS() {
    console.log("Transferring Assets from Global JS...");
    return gulp.src('../global-assets/source/js/**/*').pipe(gulp.dest('../global-assets/dist/source/js/'));
}

function dist_copyGlobalImages() {
    console.log("Transferring Assets from Global Images...");
    return gulp.src('../global-assets/source/images/**/*').pipe(gulp.dest('../global-assets/dist/source/images/global/'));
}

function dist_copyOther() {
    gulp.src('../global-assets/config/**/*').pipe(gulp.dest('../global-assets/dist/config'));
    gulp.src('../global-assets/core/**/*').pipe(gulp.dest('../global-assets/dist/core'));
    gulp.src('../global-assets/package.json').pipe(gulp.dest('../global-assets/dist/'));
    gulp.src('../global-assets/composer.json').pipe(gulp.dest('../global-assets/dist/'));
    gulp.src('../global-assets/.npmrc').pipe(gulp.dest('../global-assets/dist/'));
    gulp.src('../global-assets/LICENSE').pipe(gulp.dest('../global-assets/dist/'));
    gulp.src('../global-assets/Readme.md').pipe(gulp.dest('../global-assets/dist/'));
    return gulp.src('../global-assets/gulpfile.js').pipe(gulp.dest('../global-assets/dist/'));
}

function zipDist() {
    gulp.src('../global-assets/source/webfonts/martel/**', {dot: true})
        .pipe(zip('martel.zip'))
        .pipe(gulp.dest('./public_html/assets/'));
    gulp.src('../global-assets/source/webfonts/merriweather/**', {dot: true})
        .pipe(zip('merriweather.zip'))
        .pipe(gulp.dest('./public_html/assets/'));
    gulp.src('../global-assets/source/webfonts/public-sans/**', {dot: true})
        .pipe(zip('public-sans.zip'))
        .pipe(gulp.dest('./public_html/assets/'));
    gulp.src('../global-assets/source/webfonts/roboto/**', {dot: true})
        .pipe(zip('roboto.zip'))
        .pipe(gulp.dest('./public_html/assets/'));
    
    console.log("Move Pattern Lab to Drupal Theme");
    gulp.src('../global-assets/dist/**/*', {dot: true})
        .pipe(gulp.dest('../nds-drupal-theme/nds/'));

    gulp.src('../nds-drupal-theme/**', {dot: true})
        .pipe(zip('nds-drupal-theme.zip'))
        .pipe(gulp.dest('./public_html/assets/'));

    console.log("Zipping Pattern Lab Dist");
    return gulp.src('../global-assets/dist/**', {dot: true})
        .pipe(zip('nds.zip'))
        .pipe(gulp.dest('./'))
        .pipe(gulp.dest('./public_html/assets/'));
}