var gulp = require("gulp");

//dont stop watch
var plumber = require("gulp-plumber");

//notify
var notify  = require('gulp-notify');

//sass

var sass = require("gulp-sass");

gulp.task("sass", function() {
  gulp.src("develop/assets/scss/**/*.scss")
    .pipe(plumber({
      errorHandler: notify.onError("Error! <%= error.message %>") //<-
    }))
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(gulp.dest('build/css'));
});

//uglify
var uglify = require('gulp-uglify');

gulp.task('uglify', function() {
  return gulp.src('develop/assets/js/*.js')
    // .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

//imagemin
var imagemin = require('gulp-imagemin');

gulp.task( 'imagemin', function(){
  var imageminOptions = {
    optimizationLevel: 7
  };
  gulp.src("develop/assets/img/**/*.*")
    .pipe(imagemin( imageminOptions ))
    .pipe(gulp.dest( 'build/img' ));
});


//prefix
var pleeease = require('gulp-pleeease');

gulp.task('ple', function() {
  return gulp.src('build/css/*.css')
    .pipe(pleeease())
    .pipe(gulp.dest('build/css/'));
});


//sprite
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  var spriteData = gulp.src('develop/assets/img/sprite/*.png') //スプライトにする画像いれるとこ
  .pipe(spritesmith({
    imgName: 'sprite.png', //スプライトの画像
    cssName: '_sprite.scss', //生成されるscss
    imgPath: '/img/sprite.png', //生成されるscssに記載されるパス
    cssFormat: 'scss', //フォーマット
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
    }
  }));
  spriteData.img.pipe(gulp.dest('build/img/')); //imgNameで指定したスプライト画像の保存先
  spriteData.css.pipe(gulp.dest('develop/assets/scss/')); //cssNameで指定したcssの保存先
});


//jade
var jade = require('gulp-jade');

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src(
      ["develop/template/*.jade",'!' + "develop/template/_*.jade"] //注1
  )
  .pipe(plumber())
  .pipe(jade({
    locals: YOUR_LOCALS,
    pretty: true
  }))
  .pipe(gulp.dest('build/'));
});

//watch tasks
gulp.task("default", function() {
  gulp.watch("develop/assets/scss/**/*.scss",["sass"]);
  gulp.watch("develop/assets/js/**/*.js",["uglify"]);
  gulp.watch("develop/assets/img/**/*.*",["imagemin"]);
  gulp.watch("develop/**/*.jade",["jade"]);
  gulp.watch("develop/**/*.png",["sprite"]);
  gulp.watch("build/css/*.css", ["ple"]);
});