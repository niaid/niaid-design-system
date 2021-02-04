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
const replace = require('gulp-replace');
const beautify = require('gulp-jsbeautifier');
const ndsLiteFiles = require('./config-nds-lite.json');
var merge = require('merge-stream');

// compileSass - Compile CSS for NDS Documentation
gulp.task('compileSass', () => {
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
        .pipe(gulp.dest('./source/css'))
        .pipe(cache.clear())
        .pipe(browserSync.stream());
});

// compileJS - Compile JS for NDS Documentation
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

gulp.task('compileJS', () => {
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
});

// compilePatternLab - Compile Pattern Lab for NDS Documentation
gulp.task('compilePatternLab', (cb) => {
    console.log("Compiling Pattern Lab...")
    return exec('php core/console --generate', function(err, stdout, stderr) {
        cache.clearAll();
        browserSync.reload();
        cb(err);
    });
});

// copyGlobalSass - Copy CSS into NDS Documentation
gulp.task('copyGlobalSass', () => {
    console.log("Transferring Assets from Global SASS...");
    gulp.src('../global-assets/source/css/libraries/**/*').pipe(gulp.dest('./source/css/libraries/'));
    return gulp.src('../global-assets/source/css/global/**/*').pipe(gulp.dest('./source/css/global/'));
});

// copyGlobalJS - Copy JS into NDS Documentation
gulp.task('copyGlobalJS', () => {
    console.log("Transferring Assets from Global JS...");
    return gulp.src('../global-assets/source/js/**/*').pipe(gulp.dest('./source/js/'));
});

// copyGlobalPatterns - Copy Patterns into NDS Documentation
gulp.task('copyGlobalPatterns', () => {
    console.log("Transferring Assets from Global Patterns...");
    console.log("Copying Patterns...");
    return gulp.src('../global-assets/source/_patterns/00-nds/**/*').pipe(gulp.dest('./source/_patterns/00-nds/'));
});

// copyGlobalImages - Copy Images into NDS Documentation
gulp.task('copyGlobalImages', () => {
    console.log("Transferring Assets from Global Images...");
    return gulp.src('../global-assets/source/images/**/*').pipe(gulp.dest('./source/images/'));
});

// cleanNDS - Clear out the 00-nds folder.
gulp.task('cleanNDS', (cb) => {
    return del(['./source/_patterns/00-nds/**/*'], cb);
});

// cleanIgnoredSourceDirectories - Cleans out any gitignored directories before fresh copies from Global Assets are added.
gulp.task('cleanIgnoredSourceDirectories', (cb) => {
    let dirs = [
        './source/css/global/**/*',
        './source/css/libraries/**/*',
        './source/images/global/**/*',
        './source/js/global/**/*',
        './source/js/libraries/**/*',
        './source/js/utilities/**/*'
    ];
    return del(dirs, {'force': true}, cb);
});

// cleanDistributionDirectories - Cleans out any distribution items before a fresh build is created.
gulp.task('cleanDistributionDirectories', (cb) => {
    let dirs = [
        './public_html/**/*',
        '../nds-drupal-theme/nds/**/*',
        '../global-assets/dist/**/*',
        '!../global-assets/dist/.gitignore'
    ];
    return del(dirs, {'force': true}, cb);
});

// GULP: serveProject - Serves project locally and watches files for changes.
gulp.task('serveProject', () => {
    browserSync.init({
        server: {
            baseDir: './',
        },
        startPath: './public/',
        open: true
    });

    gulp.watch(['./source/_patterns/01-atoms/**/*', './source/_patterns/02-molecules/**/*', './source/_patterns/03-organisms/**/*', './source/_patterns/04-sections/**/*', './source/_patterns/05-pages/**/*'], gulp.series('compileSass', 'compileJS', 'compilePatternLab'));
    gulp.watch('../global-assets/source/css/**/*', gulp.series('copyGlobalSass', 'compileSass', 'compilePatternLab'));
    gulp.watch('../global-assets/source/js/**/*', gulp.series('copyGlobalJS', 'compileJS', 'compilePatternLab'));
    gulp.watch('../global-assets/source/_patterns/**/*', gulp.series('cleanNDS', 'copyGlobalPatterns', 'compileSass', 'compileJS', 'compilePatternLab'));
});

// GULP: default - Running gulp compiles the NDS Documentaiton site and serves it locally.
gulp.task('default', gulp.series('cleanNDS', 'cleanIgnoredSourceDirectories', 'copyGlobalImages', 'copyGlobalSass', 'copyGlobalJS', 'copyGlobalPatterns', 'compileSass', 'computeIncludedJSFiles', 'compileJS', 'compilePatternLab', 'serveProject'));

// GULP - buildProd - Build the NDS Documentation site for deploy.
gulp.task('buildProd', gulp.series('cleanDistributionDirectories', 'compileSass', 'computeIncludedJSFiles', 'compileJS', compileNDSLite, 'compilePatternLab', formatComponents, buildNDSDocumentationSite, compileGlobalAssets, buildDist, copyAssetsToDrupalTheme, bundleGlobals, zipAssets));

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
        },
        {
            "page_name": "migration-guide",
            "target_dest": "./public_html/migration-guide"
        },
        {
            "page_name": "font-awesome-pro",
            "target_dest": "./public_html/font-awesome-pro-nds-npm"
        },
        {
            "page_name": "about",
            "target_dest": "./public_html/about-nds"
        },
        {
            "page_name": "static-site-builder",
            "target_dest": "./public_html/nds-static-site-builder"
        },
        {
            "page_name": "nds-drupal-theme",
            "target_dest": "./public_html/nds-drupal-theme"
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
    gulp.src(['./source/css/nds-min.css', './source/css/builder.css'])
        .pipe(gulp.dest('./public_html/css'));
    gulp.src('./source/css/libraries/**/*')
        .pipe(gulp.dest('./public_html/css/libraries/'));
    gulp.src('./source/css/custom/**/*')
        .pipe(gulp.dest('./public_html/css/custom/'));
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

// copyAssetsToDrupalTheme - Move a copy of the NDS files into the NDS-based Drupal theme.
function copyAssetsToDrupalTheme() {
    console.log("Move Pattern Lab to Drupal Theme");
    return gulp.src('../global-assets/dist/**/*', {dot: true})
        .pipe(gulp.dest('../nds-drupal-theme/nds/'));
}

// compileGlobalAssets - A function to concatenate and compile the component CSS and JS files into single .css and .js distribution files.
function compileGlobalAssets() {
    // SASS
    gulp.src('../global-assets/source/css/style.scss')
        .pipe(sassGlob())
        .pipe(concat('nds.css'))
        .pipe(rename({
            basename: 'nds-min',
            extname: '.css'
        }))
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ["../global-assets/node_modules/bootstrap/scss", "../global-assets/node_modules/font-awesome/scss"]
        }).on('error', sass.logError))
        .pipe(gulp.dest('../global-assets/source/css'))
        .pipe(gulp.dest('./public_html/assets'));

    // JS
    return gulp.src('../global-assets/source/_patterns/**/*.js')
        .pipe(concat('nds.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('../global-assets/source/js/global/'))
        .pipe(gulp.dest('./public_html/assets'));
}

// buildDist - Copies global files from global-assets into a distribution folder.
function buildDist() {
    var paths = [
        { src: '../global-assets/source/webfonts/**/*', dest: '../global-assets/dist/source/webfonts/' },
        { src: '../global-assets/source/css/**/*', dest: '../global-assets/dist/source/css/' },
        { src: '../global-assets/source/js/**/*', dest: '../global-assets/dist/source/js/' },
        { src: '../global-assets/source/_patterns/**/*', dest: '../global-assets/dist/source/_patterns/' },
        { src: '../global-assets/source/_data/**/*', dest: '../global-assets/dist/source/_data/' },
        { src: '../global-assets/source/_meta/**/*', dest: '../global-assets/dist/source/_meta/' },
        { src: '../global-assets/source/images/**/*', dest: '../global-assets/dist/source/images/' },
        { src: '../global-assets/config/**/*', dest: '../global-assets/dist/config' },
        { src: '../global-assets/core/**/*', dest: '../global-assets/dist/core' },
        { src: '../global-assets/package.json', dest: '../global-assets/dist/' },
        { src: '../global-assets/composer.json', dest: '../global-assets/dist/' },
        { src: '../global-assets/LICENSE', dest: '../global-assets/dist/' },
        { src: '../global-assets/Readme.md', dest: '../global-assets/dist/' },
        { src: '../global-assets/gulpfile.js', dest: '../global-assets/dist/' }
    ];

    var tasks = paths.map(function (path) {
        return gulp.src(path.src).pipe(gulp.dest(path.dest));
    });

    return merge(tasks);
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

    // Zip Static Site Builder
    console.log("Zipping Pattern Lab");
    return gulp.src('../global-assets/dist/**', {dot: true})
        .pipe(zip('nds-static-site-builder.zip'))
        .pipe(gulp.dest('./public_html/assets/'));
}

// formatComponents - A function to beautify the Component code snippets for production.
function formatComponents() {
    gulp.src('./public/patterns/06-dist-migration-guide-migration-guide/06-dist-migration-guide-migration-guide.html')
        .pipe(beautify())
        .pipe(gulp.dest('./public/patterns/06-dist-migration-guide-migration-guide/'));

    return gulp.src('./public/patterns/06-dist-components-components/06-dist-components-components.html')
        .pipe(beautify())
        .pipe(gulp.dest('./public/patterns/06-dist-components-components/'));
}

// bundleGlobals - A function to build a zip files for JS and CSS.
function bundleGlobals() {
    // CSS
    gulp.src(['./public_html/assets/nds-min.css'])
        .pipe(zip('nds-css.zip'))
        .pipe(gulp.dest('./public_html/assets/'));
    // JS
    gulp.src(['./public_html/assets/nds-lite.js', './public_html/assets/nds-lite-min.js'])
        .pipe(zip('nds-lite-js.zip'))
        .pipe(gulp.dest('./public_html/assets/'));
    return gulp.src(['../global-assets/source/js/global', '../global-assets/source/js/libraries'])
        .pipe(zip('nds-bundled-js.zip'))
        .pipe(gulp.dest('./public_html/assets/'));
}

gulp.task('compileNDSLite', gulp.series(compileNDSLite));

// compileNDSLite - Reads files from config-nds-lite.json and builds nds-lite.min.js
function compileNDSLite() {
    console.log(ndsLiteFiles);
    return gulp.src(ndsLiteFiles, {base: './'})
        .pipe(concat('nds-lite.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify())
        .pipe(sourcemaps.write('../global-assets/dist/source/js/global/'))
        .pipe(gulp.dest('../global-assets/dist/source/js/global/'))
        .pipe(gulp.dest('./public_html/assets/'));
}