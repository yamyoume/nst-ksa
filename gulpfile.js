var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect-php'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    concatcss = require('gulp-concat-css'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    replace = require('gulp-replace');

var env,
    jsSources,
    // admin_jsSources,
    sassSources,
    // admin_sassSources,
    cssSources,
    // admin_cssSources,
    htmlSources,
    jsonSources,
    outputDir;

// in production we set the NODDE_ENV var from the terminal
env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir = 'builds/development/';
} else {
  outputDir = 'builds/production/';
}

jsSources = [
  'components/scripts/jquery/dist/jquery.js',
  'components/bootstrap/popper.min.js',
  'components/bootstrap/dist/js/bootstrap.js',
  'components/js/jquery.easing.min.js',
  'components/scripts/pushy/js/pushy.min.js',
  'components/scripts/waypoints/lib/jquery.waypoints.min.js',
  'components/scripts/wow/dist/wow.min.js',
  'components/js/jquery.countTo.js',
  'components/js/jquery.preloader.min.js',
  'components/scripts/magnific-popup/dist/jquery.magnific-popup.min.js',
  'components/scripts/theia-sticky-sidebar/dist/ResizeSensor.min.js',
  'components/scripts/theia-sticky-sidebar/dist/theia-sticky-sidebar.min.js',
  'components/scripts/owl.carousel/dist/owl.carousel.js',
  'components/scripts/textillate/assets/jquery.lettering.js',
  'components/scripts/textillate/assets/jquery.fittext.js',
  'components/scripts/textillate/jquery.textillate.js',
  'components/scripts/jarallax/dist/jarallax.min.js',
  'components/scripts/jarallax/dist/jarallax-video.min.js',
  'components/scripts/masonry/dist/masonry.pkgd.min.js',
  'components/js/imagesloaded.pkgd.min.js',
  'components/js/jquery.countdown.min.js',
  'components/scripts/jquery-knob/dist/jquery.knob.min.js',
  'components/js/smooth-scroll.min.js',
  'components/js/jquery.particleground.js',
  'components/js/typed.min.js',
  'components/js/jquery.sticky.js',
  'components/cubeportfolio/js/jquery.cubeportfolio.min.js',
  'components/revolution/js/jquery.themepunch.tools.min.js',
  'components/revolution/js/jquery.themepunch.revolution.min.js',
  'components/revolution/js/extensions/revolution.extension.actions.min.js', // SLIDER REVOLUTION 5.0 EXTENSIONS  (Load Extensions only on Local File Systems !  The following part can be removed on Server for On Demand Loading)
  'components/revolution/js/extensions/revolution.extension.carousel.min.js',
  'components/revolution/js/extensions/revolution.extension.kenburn.min.js',
  'components/revolution/js/extensions/revolution.extension.layeranimation.min.js',
  'components/revolution/js/extensions/revolution.extension.migration.min.js',
  'components/revolution/js/extensions/revolution.extension.navigation.min.js',
  'components/revolution/js/extensions/revolution.extension.parallax.min.js',
  'components/revolution/js/extensions/revolution.extension.slideanims.min.js',
  'components/revolution/js/extensions/revolution.extension.video.min.js',
  'components/scripts/jquery-validation/dist/jquery.validate.js',
  'components/scripts/jquery-validation/dist/localization/messages_ar.js',
  'components/scripts/jquery-confirm/jquery-confirm.min.js',
  'components/js/typeahead.bundle.min.js',
  'components/js/assan.custom.js',
  'components/js/script.js'
];

// admin_jsSources = [
//   'components/scripts/jquery/dist/jquery.js',
//   'components/bootstrap/popper.min.js',
//   'components/bootstrap/dist/js/bootstrap.js',
//   'components/scripts/metisMenu/dist/metisMenu.min.js',
//   'components/js/jquery.slimscroll.min.js',
//   'components/scripts/jquery-confirm/jquery-confirm.min.js',
//   'components/scripts/jquery-validation/dist/jquery.validate.js',
//   'components/scripts/jquery-validation/dist/localization/messages_ar.js',
//   'components/js/typeahead.bundle.min.js'
// ];

cssSources = [
  'components/bootstrap/dist/css/bootstrap.css',
  'components/scripts/font-awesome/css/font-awesome.min.css',
  'components/scripts/themify-icons/css/themify-icons.css',
  'components/scripts/animate.css/animate.css',
  'components/scripts/pushy/css/pushy.css',
  'components/scripts/magnific-popup/dist/magnific-popup.css',
  'components/scripts/owl.carousel/dist/assets/owl.carousel.css',
  'components/scripts/owl.carousel/dist/assets/owl.theme.default.css',
  'components/scripts/line-icons/line-icons.css',
  'components/revolution/css/settings.css',
  'components/revolution/css/layers.css',
  'components/revolution/css/navigation.css',
  'components/cubeportfolio/css/cubeportfolio.min.css',
  'components/scripts/jquery-confirm/jquery-confirm.min.css',
  outputDir+'css/sass.css'
];

// admin_cssSources = [
//   'components/bootstrap/dist/css/bootstrap.css',
//   'components/scripts/font-awesome/css/font-awesome.min.css',
//   'components/ionicons/css/ionicons.min.css',
//   'components/scripts/metisMenu/dist/metisMenu.min.css',
//   'components/scripts/jquery-confirm/jquery-confirm.min.css',
//   'css/style.css'
// ];

sassSources = ['components/sass/style.scss'];

htmlSources = ['builds/development/*.html', 'builds/development/**/*.php'];

jsonSources = [outputDir+'js/*.json'];

// admin_sassSources = ['components/admin_sass/**/*.scss'];


gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('./plugins/plugins.js'))
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir+'js'))
    .pipe(browserSync.reload({ stream:true }));

});

gulp.task('sass', function () {
    return gulp.src(sassSources)
    .pipe(sass({
      sourceComments: 'map',
      sourceMap: 'sass',
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(rename('sass.css'))
    .pipe(gulp.dest(outputDir+'css/'))
    .pipe(browserSync.reload({ stream:true }));
});

gulp.task('css', ['sass'], function() {
  gulp.src(cssSources)
    .pipe(concatcss('./style.css'))
    .pipe(replace('../../../../builds/development', '..'))
    .pipe(replace('../../../../builds/production', '..'))
    .pipe(replace('../../../scripts', '../assets'))
    .pipe(replace('../../../', '../assets/'))
    .pipe(gulpif(env === 'production', cssmin()))
    // .pipe(gulpif(env === 'production', rename({suffix: '.min'})))
    .pipe(gulp.dest(outputDir+'css'))
    .pipe(browserSync.reload({ stream:true }));

});


/*
**********************
* Admin Tasks
**********************
*/


// gulp.task('admin_js', function () {
//   return gulp.src(admin_jsSources)
//   .pipe(concat('plugins.js'))
//   .pipe(gulp.dest(outputDir+'admin/js/plugins/'))
//   .pipe(browserSync.reload({ stream:true }));
// });

// gulp.task('admin_sass', function () {
//     return gulp.src(admin_sassSources)
//     .pipe(sass({
//       sourceComments: 'map',
//       sourceMap: 'sass',
//       outputStyle: 'nested'
//     }).on('error', sass.logError))
//     .pipe(gulpif(env === 'production', cssmin()))
//     .pipe(gulp.dest(outputDir+'admin/css/'))
//     .pipe(browserSync.reload({ stream:true }));
// });

// gulp.task('admin_css', function () {
//   return gulp.src(admin_cssSources)
//   .pipe(concatcss("plugins/plugins.css", {"rebaseUrls" : false})) //rebaseUrls : false
//   .pipe(gulpif(env === 'production', cssmin()))
//   .pipe(gulp.dest(outputDir+'admin/css/'))
//   .pipe(browserSync.reload({ stream:true }));
// });

/*
**********************
* Admin Tasks End
**********************
*/

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  // gulp.watch(admin_jsSources, ['admin_js']);
  gulp.watch(cssSources, ['css']);
  // gulp.watch(admin_cssSources, ['admin_css']);
  gulp.watch('components/sass/**/*.scss', ['sass']);
  // gulp.watch('components/admin_sass/*.scss', ['admin_sass']);
  gulp.watch('builds/development/*.html', ['html']);
  gulp.watch('builds/development/js/*.json', ['json']);
  gulp.watch('builds/development/images/**/*.*', ['images']);
});


gulp.task('connect-sync', function() {
  connect.server({}, function (){
    browserSync({
      proxy: '127.0.0.1:8000'
    });
  });
 
  gulp.watch('**/*.php').on('change', function () {
    browserSync.reload();
  });
});

gulp.task('html', function() {
  return gulp.src(htmlSources)
  // .pipe(replace('define("DB_NAME", "aldweik_database")', 'define("DB_NAME", "m7mdaldw_database")'))
  // .pipe(replace('define("DB_PASS", "q1w2e3r4t5")', 'define("DB_PASS", "Aldweik_@533945")'))
  // .pipe(replace('define("DB_USER", "aldweik_admin")', 'define("DB_USER", "m7mdaldw_admin")'))
  // .pipe(gulpif(env === 'production', minifyHTML()))
  .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
  .pipe(browserSync.reload({ stream:true }));

})

gulp.task('images', function() {
  return gulp.src('builds/development/images/**/*.*')
  .pipe(gulpif(env === 'production', gulp.dest(outputDir+'images')))
  .pipe(browserSync.reload({ stream:true }));

});

gulp.task('json', function() {
  gulp.src('builds/development/js/*.json')
  .pipe(gulpif(env === 'production', jsonminify()))
  .pipe(gulpif(env === 'production', gulp.dest('builds/production/js')))
  .pipe(browserSync.reload({ stream:true }));

})

gulp.task('default', ['js', 'sass','css', 'json','connect-sync', 'watch']); //, 'admin_sass', 'admin_css', 'admin_js'