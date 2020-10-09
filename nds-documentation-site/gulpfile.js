/* Gulp File
    Last Modified by: Jacob Caccamo
    October 9, 2020
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
const zip = require('gulp-zip');
const del = require('del');

// compileSass - Compile CSS for NDS Documentation
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

// compileJS - Compile JS for NDS Documentation
// This logic replaces any scripts on build in the 00-nds folder with scripts of the same name in the custom directories (01-atoms, etc.).
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

// compilePatternLab - Compile Pattern Lab for NDS Documentation
function compilePatternLab(cb) {
    console.log("Compiling Pattern Lab...")
    return exec('php core/console --generate', function(err, stdout, stderr) {
        cache.clearAll();
        browserSync.reload();
        cb(err);
    });
}

// copyGlobalSass - Copy CSS into NDS Documentation
function copyGlobalSass() {
    console.log("Transferring Assets from Global SASS...");
    gulp.src('../global-assets/source/css/style.scss').pipe(gulp.dest('./source/css/'));
    gulp.src('../global-assets/source/css/libraries/**/*').pipe(gulp.dest('./source/css/libraries/'));
    return gulp.src('../global-assets/source/css/global/**/*').pipe(gulp.dest('./source/css/global/'));
}

// copyGlobalJS - Copy JS into NDS Documentation
function copyGlobalJS() {
    console.log("Transferring Assets from Global JS...");
    return gulp.src('../global-assets/source/js/**/*').pipe(gulp.dest('./source/js/'));
}

// copyGlobalPatterns - Copy Patterns into NDS Documentation
function copyGlobalPatterns() {
    console.log("Transferring Assets from Global Patterns...");
    console.log("Copying Patterns...");
    return gulp.src('../global-assets/source/_patterns/00-nds/**/*').pipe(gulp.dest('./source/_patterns/00-nds/'));
}

// copyGlobalImages - Copy Images into NDS Documentation
function copyGlobalImages() {
    console.log("Transferring Assets from Global Images...");
    return gulp.src('../global-assets/source/images/**/*').pipe(gulp.dest('./source/images/'));
}

// copyFonts - Copy Fonts into NDS Documentation
function copyFonts() {
    return gulp.src('../global-assets/source/webfonts/**/*')
        .pipe(gulp.dest('./source/webfonts/'));
}

// cleanNDS - Clear out the 00-nds folder.
function cleanNDS() {
    return del('./source/_patterns/00-nds/**/*', {force:true});
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

    gulp.watch(['./source/_patterns/01-atoms/**/*', './source/_patterns/02-molecules/**/*', './source/_patterns/03-organisms/**/*', './source/_patterns/04-sections/**/*', './source/_patterns/05-pages/**/*'], gulp.series(compileSass, compileJS, compilePatternLab));
    gulp.watch('../global-assets/source/css/**/*', gulp.series(copyGlobalSass, compileSass, compilePatternLab));
    gulp.watch('../global-assets/source/js/**/*', gulp.series(copyGlobalJS, compileJS, compilePatternLab));
    gulp.watch('../global-assets/source/_patterns/**/*', gulp.series(cleanNDS, copyGlobalPatterns, compileSass, compileJS, compilePatternLab));
});

// GULP: default - Running gulp compiles the NDS Documentaiton site and serves it locally.
// TODO: Add copyNodeModules
gulp.task('default', gulp.series(copyFonts, copyGlobalImages, copyGlobalSass, copyGlobalJS, cleanNDS, copyGlobalPatterns, compileSass, 'computeIncludedJSFiles', compileJS, compilePatternLab, 'serveProject'));

// GULP - buildProd - Build the NDS Documentation site for deploy.
gulp.task('buildProd', gulp.series(compileSass, 'computeIncludedJSFiles', compileJS, compilePatternLab, buildNDSDocumentationSite, compileGlobalAssets, buildDist, zipAssets));

// buildNDSDocumentationSite - Move assets for the NDS Documentation Site to the public_html folder for deployment.
function buildNDSDocumentationSite() {
    // Define Names of Pages to Build for Production (Use the name of the Twig file in the 06-dist folder) to Compiled Pages & Desired Distribution Paths.
    var buildPaths = [
        {
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
    gulp.src(['./source/css/style.css', './source/css/builder.css'])
        .pipe(gulp.dest('./public_html/css'));
    gulp.src('./source/css/libraries/*.css')
        .pipe(gulp.dest('./public_html/css/libraries/'));
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
    gulp.src('./source/webfonts/**/*')
        .pipe(gulp.dest('./public_html/webfonts'));

    console.log("Move Pattern Lab to Drupal Theme");
    return gulp.src('../global-assets/dist/**/*', {dot: true})
        .pipe(gulp.dest('../nds-drupal-theme/nds/'));
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
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ["../global-assets/node_modules/bootstrap/scss", "../global-assets/node_modules/font-awesome/scss"]
        }).on('error', sass.logError))
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
        .pipe(gulp.dest('../global-assets/source/js/global/'));
}

// buildDist - Copies global files from global-assets into a distribution folder.
function buildDist() {
    // Transfer Fonts
    console.log("Transferring Assets from Global Webfonts...");
    gulp.src('../global-assets/source/webfonts/**/*')
        .pipe(gulp.dest('../global-assets/dist/source/webfonts/'));

    // Transfer CSS
    console.log("Transferring Assets from Global SASS...");
    gulp.src('../global-assets/source/css/**/*').pipe(gulp.dest('../global-assets/dist/source/css/'));

    // Transfer JS
    console.log("Transferring Assets from Global JS...");
    gulp.src('../global-assets/source/js/**/*').pipe(gulp.dest('../global-assets/dist/source/js/'));

    // Transfer Patterns
    console.log("Transferring Assets from Global Patterns...");
    gulp.src('../global-assets/source/_patterns/**/*').pipe(gulp.dest('../global-assets/dist/source/_patterns/'));

    // Transfer Data and Meta
    console.log("Transferring Assets from Data and Meta...");
    gulp.src('../global-assets/source/_data/**/*').pipe(gulp.dest('../global-assets/dist/source/_data/'));
    gulp.src('../global-assets/source/_meta/**/*').pipe(gulp.dest('../global-assets/dist/source/_meta/'));

    // Transfer Images
    console.log("Transferring Assets from Global Images...");
    gulp.src('../global-assets/source/images/**/*').pipe(gulp.dest('../global-assets/dist/source/images/'));

    // Other Files
    gulp.src('../global-assets/config/**/*').pipe(gulp.dest('../global-assets/dist/config'));
    gulp.src('../global-assets/core/**/*').pipe(gulp.dest('../global-assets/dist/core'));
    gulp.src('../global-assets/package.json').pipe(gulp.dest('../global-assets/dist/'));
    gulp.src('../global-assets/composer.json').pipe(gulp.dest('../global-assets/dist/'));
    gulp.src('../global-assets/.npmrc').pipe(gulp.dest('../global-assets/dist/'));
    gulp.src('../global-assets/LICENSE').pipe(gulp.dest('../global-assets/dist/'));
    gulp.src('../global-assets/Readme.md').pipe(gulp.dest('../global-assets/dist/'));
    return gulp.src('../global-assets/gulpfile.js').pipe(gulp.dest('../global-assets/dist/'));
}

// zipAssets - Zips webfont pacakges, the NDS Drupal Theme, and the distribution folder created in buildDist.
function zipAssets() {
    // Zip Font Folders
    console.log("Zipping Font Folders");
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

    // Zip Drupal Theme
    console.log("Zipping Drupal Theme");
    gulp.src('../nds-drupal-theme/**', {dot: true})
        .pipe(zip('nds-drupal-theme.zip'))
        .pipe(gulp.dest('./public_html/assets/'));

    // Zip Pattern Lab
    console.log("Zipping Pattern Lab");
    return gulp.src('../global-assets/dist/**', {dot: true})
        .pipe(zip('nds.zip'))
        .pipe(gulp.dest('./public_html/assets/'));
}