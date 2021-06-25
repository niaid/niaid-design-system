/* Gulp File
    Last Modified by: Jacob Caccamo
    June 14, 2021
*/

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const argv = require('yargs').argv;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const htmlreplace = require('gulp-html-replace');
const minify = require('gulp-minify');
const exec = require('child_process').exec;
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const tap = require('gulp-tap');
const fs = require("fs");

let isProduction = (argv.production === undefined) ? false : true;

let srcPath = "./niaid-design-system/";

// copyFonts - Copy Font Awesome from node_modules into project.
gulp.task('copyFonts', () => {
    return gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('./src/webfonts/font-awesome'));
});

// compileSass - Compile CSS for your static site.
gulp.task('compileSass', () => {
    console.log("Compiling Sass...");
    return gulp.src('src/css/style.scss')
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
        .pipe(autoprefixer())
        .pipe(gulpif(!isProduction, sourcemaps.write('./maps')))
        .pipe(gulp.dest('./src/css'));
});

// compileJS - Compile JS for your static site.
// This logic replaces any scripts on build in the 00-nds folder with scripts of the same name in the custom directories (01-atoms, etc.).
var includedJS = ['./src/js/utilities/utilities.js', './src/js/global/init.js'];
gulp.task('computeIncludedJSFiles', function() {
    var overridesJS = [];
    return gulp.src('./src/_patterns/**/*.js').pipe(tap(function(file, t) {
        if (file.path.split('src/').length > 1) {
            var parsedPath = file.path.split('src/')[1];
        }
        else {
            var parsedPath = file.path.split("src\\")[1];
        }
        if (!parsedPath.includes('00-nds')) {
            overridesJS.push(parsedPath);
            includedJS.push('./src/' + parsedPath);
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
                includedJS.push('./src/' + parsedPath);
            }
        }
    }));
});
gulp.task('compileJS', () => {
    console.log(includedJS);
    console.log("Compiling JS...");
    return gulp.src(includedJS, {base: './src/'})
        .pipe(concat('nds.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify())
        .pipe(sourcemaps.init())
        .pipe(gulpif(!isProduction, sourcemaps.write('./maps')))
        .pipe(gulp.dest('./src/js/'));
});

// GULP: compilePatternLab - Compile Pattern Lab for your static site.
gulp.task('compilePatternLab', (cb) => {
    console.log("Compiling Pattern Lab...")
    return exec('php core/console --generate', function(err, stdout, stderr) {
        browserSync.reload();
        cb(err);
    });
});

// GULP: computePaths - Creates distribution paths based on page name and location.
var pages = [];
gulp.task('computePaths', () => {
    pages = [];
    return gulp.src('./src/_patterns/05-pages/**/*.twig').pipe(tap(function(file, t) {
        if (file.path.split('src/').length > 1) {
            addPage(file.path);
        }
        else {
            let escaped = file.path.replace(/\\/g, "/");
            addPage(escaped);
        }
    }));
});

// cleanDistributionDirectories - Cleans out any distribution items before a fresh build is created.
gulp.task('cleanDistributionDirectories', (cb) => {
    let dirs = [
        './dist/**/*'
    ];
    return del(dirs, {'force': true}, cb);
});

// GULP: moveAssets - Move all distribution assets to the dist/ folder.
gulp.task('moveAssets', () => {
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
                .pipe(gulp.dest('./dist/'));
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
                .pipe(gulp.dest('./dist/' + pages[i].targetPath));
        }
    }

    // Copy CSS
    console.log("Copy CSS");
    gulp.src('./src/css/nds-min.css')
        .pipe(gulp.dest('./dist/css'));
    gulp.src('./src/css/libraries/**/*')
        .pipe(gulp.dest('./dist/css/libraries'));
    if (!isProduction) {
        gulp.src('./src/css/maps/**/*')
            .pipe(gulp.dest('./dist/css/maps'));
    }

    // Copy JS
    console.log("Copy JS");
    if (isProduction) {
        gulp.src(['./src/js/**/*', '!./src/js/maps', '!./src/js/maps/**'])
            .pipe(gulp.dest('./dist/js'));
    }
    else {
        gulp.src('./src/js/**/*')
            .pipe(gulp.dest('./dist/js'));
    }

    // Copy Images
    console.log("Copy Images");
    gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dist/assets'));

    // Copy Fonts
    console.log("Copy Fonts");
    return gulp.src('./src/webfonts/**/*')
        .pipe(gulp.dest('./dist/webfonts'));
});

// GULP: cleanNDSSource - Cleans out any gitignored directories before fresh copies from Global Assets are added.
gulp.task('cleanNDSSource', (cb) => {
    let dirs = [
        './src/_patterns/00-nds/**/*',
        './src/css/global/**/*',
        './src/css/libraries/**/*',
        './src/images/global/**/*',
        './src/js/libraries/**/*',
        './src/js/utilities/**/*'
    ];
    return del(dirs, {'force': true, dot: true}, cb);
});

// GULP: initializeGitSubmodule - Checks to see if NDS is installed. If not, it installs the NDS submodule.
gulp.task('initializeGitSubmodule', (cb) => {
    if (!fs.existsSync('./niaid-design-system/')) {
        console.log("Initializing NDS Submodule");
        return exec('git submodule add git@github.com:niaid/niaid-design-system.git', function(err, stdout, stderr) {
            console.log(stdout);
            cb(err);
        });
    }
    console.log("NDS Submodule Already Installed, Skipping...")
    return gulp.src('.');
});

// GULP: updateGitSubmodules - Pulls latest code for each submodule dependency.
gulp.task('updateGitSubmodules', (cb) => {
    return exec('git submodule update --init --remote ./niaid-design-system', function(err, stdout, stderr) {
        console.log(stdout);
        cb(err);
    });
});

// GULP: copyGlobalSass - Copy CSS into NDS Documentation
gulp.task('copyGlobalSass', () => {
    console.log("Transferring Assets from Global SASS...");
    gulp.src(srcPath + 'src/css/libraries/**/*').pipe(gulp.dest('./src/css/libraries/'));
    return gulp.src(srcPath + 'src/css/global/**/*').pipe(gulp.dest('./src/css/global/'));
});

// GULP: copyGlobalJS - Copy JS into NDS Documentation
gulp.task('copyGlobalJS', () => {
    console.log("Transferring Assets from Global JS...");
    gulp.src(srcPath + 'src/js/libraries/**/*').pipe(gulp.dest('./src/js/libraries/'));
    return gulp.src(srcPath + 'src/js/utilities/**/*').pipe(gulp.dest('./src/js/utilities/'));
});

// GULP: copyGlobalPatterns - Copy Patterns into NDS Documentation
gulp.task('copyGlobalPatterns', () => {
    console.log("Transferring Assets from Global Patterns...");
    console.log("Copying Patterns...");
    return gulp.src(srcPath + 'src/_patterns/00-nds/**/*').pipe(gulp.dest('./src/_patterns/00-nds/'));
});

// GULP: copyGlobalImages - Copy Images into NDS Documentation
gulp.task('copyGlobalImages', () => {
    console.log("Transferring Assets from Global Images...");
    return gulp.src(srcPath + 'src/images/**/*').pipe(gulp.dest('./src/images/'));
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

    gulp.watch(['./src/_patterns/**/*', './src/css/**/*.scss'], gulp.series('compile'));
});

// GULP AGGREGATES

// GULP: transfer - Transfers official NDS assets to appropriate locations.
gulp.task('transfer', gulp.series('copyFonts'));

// GULP: compile - Compiles the local project assets.
gulp.task('compile', gulp.series('compileSass', 'computeIncludedJSFiles', 'compileJS', 'compilePatternLab'));

// GULP: clean - Clean out any necessary directories before building.
gulp.task('clean', gulp.series('cleanDistributionDirectories'));

// COMMANDS

// GULP: default - Running gulp compiles the your static site and serves it locally.
gulp.task('default', gulp.series('transfer', 'compile', 'serveProject'));

// GULP: build - Compile your project assets and build dist folder for deploy.
gulp.task('build', gulp.series('clean', 'compile', 'computePaths', 'moveAssets'));

// GULP: update - Update to the latest release of NDS. Warning: This will overwrite files in the _patterns/00-nds/ directory, as well as the global/ and libraries/ folders of css/ and js/
gulp.task('update', gulp.series('cleanNDSSource', 'initializeGitSubmodule', 'updateGitSubmodules', 'copyGlobalImages', 'copyGlobalSass', 'copyGlobalJS', 'copyGlobalPatterns'));

// HELPER FUNCTIONS

// addPage - Helper function for the computePaths() function. Determines the path and destination of the page.
function addPage(file) {
    let targetPath, patternLabPath;
    let distPath = file.split('src/_patterns/05-pages/')[1];
    let depth = distPath.split("/").length - 1;
    let pageName = distPath.split('/');
    pageName = pageName[pageName.length - 1];
    pageName = pageName.split('.twig')[0];
    if (distPath === "index.twig") {
        targetPath = "/";
        patternLabPath = targetPath;
    } else {
        console.log("distPath.split('/' + pageName + '.twig')", distPath.split('/' + pageName + '.twig')); 
        targetPath = distPath.split('/' + pageName + '.twig')[0];
        patternLabPath = targetPath.replace(/\//g, '-');
    };
    pages.push({ "depth": depth, "pageName": pageName, "patternLabPath": patternLabPath, "targetPath": targetPath });
    return;
}