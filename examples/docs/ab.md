---
title: gulp自动化构建工具学习
date: 2017-06-25 16:02:45

toc: false

categories:
- 自动化构建工具


tags:
- gulp
---
Gulp.js 是一个自动化构建工具,开发者可以使用它在项目开发过程中自动执行常见任务。在这里介绍了gulp的入门，插件和gulpfile.js配置文件。

<!--more-->

##### 入门

1. 全局安装`gulp`

		$ npm install -g gulp

2. 新建一个文件夹作为项目，进入该文件夹，初始化

		$ mkdir example
        $ npm init

3. 安装开发依赖（`devDependences`）

		$ npm install --save-dev gulp

4. 在项目根目录新建 `gulpfile.js` 文件

		$ touch gulpfile.js

5. 编辑`gulpfile.js`文件

    ``` JavaScript
	var gulp = require('gulp');

    gulp.task('default', function () {
    	//默认任务代码
    });
    ```
6. 命令行运行gulp，即可运行默认任务
		$ gulp

---

##### api介绍

> 这里只列出api常用用法，了解更多请查阅官网<http://www.gulpjs.com.cn/docs/api/>

1. gulp.src(globs[, options])

	输出符合匹配的文件并返回一个`stream`，可`pipe`到其他插件

	* golbs(类型：`String`或`Array`)

		> String: 'src/js/\*.js'
		> Array: ['src/js/\*.js', 'src/css/\*.css']

2. gulp.dest(path[, options])

	将`pipe`进来的数据转存为指定文件夹下的文件，若指定文件夹不存在，则自动创建该文件夹

    * path(类型：`String`或`Function`)

		> String: 'dist/js'
		> Function: 在函数中返回相应路径

3. gulp.task(name[, deps], fn)

	定义一个任务

    ``` JavaScript
    gulp.task('something', functio () {
    	doSomething();
    });
    ```
    * name(类型：`String`)

        > 任务的名字，可在命令行中通过`name`运行任务，`$ gulp name`

	* deps(类型：Array)

    	> 一个包含任务列表的数组，这些任务会在当前任务运行之前完成

    * fn(类型：`Function`)

    	> 该任务要执行的内容

4. gulp.watch(glob[, opts], tasks) 或 gulp.watch(globs[, opts, cb])

	文件监视，当指定匹配文件发生变化时，执行tasks或函数cb

    * glob(类型：`String`或`Array`)

	* tasks(类型：`String`或`Array`)

		> 文件变动后执行之前定义好的任务

    * cb(类型： `Function`)

		> 传入一个记录文件变动的`event`对象，`event.type`记录变动类型：`added`, `changed`, `deleted`；`event.path`记录变动文件的路径

---
##### gulp插件介绍

1. gulp-less/gulp-sass

	预编译less/sass文件为css文件

    安装：`$ npm install --save-dev gulp-less`

2. gulp-autoprefixer

	设置浏览器版本，css文件自动添加浏览器前缀

    安装：`$ npm install --save-dev gulp-autoprefixer`

3. gulp-minify-css

	压缩css文件

    安装：`$ npm install --save-dev gulp-minify-css`

4. gulp-rename

	重命名要输出的文件，如将.css重命名为.min.css

    安装：`$ npm install --save-dev gulp-rename`

5. vinyl-buffer

	将vinyl对象内容中的stream转换为buffer

    安装：`$ npm install --save-dev vinyl-buffer`

6. vinyl-source-stream

	将Browserify的bundle()的输出转换为Gulp可用的vinyl流

    安装：`$ npm install --save-dev vinyl-source-stream`

7. gulp-sourcemaps

	编写内联sourcemaps

    安装：`$ npm install --save-dev gulp-sourcemaps`

8. browserify

	可以让你使用类似于 node 的 require() 的方式来组织浏览器端的 Javascript 代码，在这里用来管理依赖

    安装：`$ npm install --save-dev browserify`

9. babelify

	将ES6转换成ES5

    安装：`$ npm install --save-dev babelify`

10. gulp-uglify

	压缩 JavaScript 文件

    安装：`$ npm install --save-dev gulp-uglify`

11. gulp-imagemin

	压缩 png，jpeg，gif和svg图片资源

    安装：`$ npm install --save-dev gulp-imagemin`

12. gulp-cache

	图片缓存，只有图片替换了才压缩

    安装：`$ npm install --save-dev gulp-cache`

13. gulp-clean

	移除文件或文件夹

    安装：`$ npm install --save-dev gulp-clean`

14. gulp-util

	包含gulp的一些实用功能，在这里用来打印编译错误

    安装：`$ npm install --save-dev gulp-util`

15. gulp-notify

	当文件变更时提醒

    安装：`$ npm install gulp-notify`

16. gulp-connect

	gulp中用来运行服务器的插件，内含LiveReload，自动刷新浏览器

    安装：`$ npm install --save-dev gulp-connect`

---
##### gulpfile.js文件配置
* 内含 ES6 转 ES5

```JavaScript
var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect');

/*
 * styles任务，将'src/less'目录下的less文件转换成css文件，
 * 并加上浏览器前缀，存放于'dist/css'目录下，之后重命名加上.min，压缩，
 * 保存为.min.css文件，之后刷新浏览器，并提醒style任务完成
 */
gulp.task('styles', function() {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8',
        'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .on('error', gutil.log)
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init())
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
        .pipe(notify({message: 'style task complete'});
});

/*
 * scripts任务，通过browserify设置入口文件，然后用babelify将
 * es6转换成es5，保存在'dist/js'目录下，之后压缩js文件，重命名
 * 保存为.min.js文件
 */
gulp.task('scripts', function() {
    var b = browserify({
        entries: 'src/js/cart.js',
        debug: true
    });

    return b.transform(babelify.configure({
            presets: ["es2015"]
        }))
        .bundle()
        .on('error', gutil.log)
        .pipe(source('cart.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

/*
 * images任务，读取'src/img'目录下的图片，压缩并保存到'dist/img'目录下
 */
gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(cache(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})])))
        .on('error', gutil.log)
        .pipe(gulp.dest('dist/img'))
        .pipe(connect.reload());
});

/*
 * html任务，读取'src'目录下的html文件，并保存到'dist'目录下
 */
gulp.task('html', function() {
    return gulp.src('src/shangcheng/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

/*
 * connect任务，运行服务器并自动刷新浏览器
 */
gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

/*
 * clean任务，将dist目录下的css文件，js文件，图片文件和html文件清除
 */
gulp.task('clean', function() {
    return gulp.src(['dist/css', 'dist/js', 'dist/img',
    'dist/*.html'], {read: false})
        .pipe(clean());
});

/*
 * 默认任务，在开始执行styles任务，scripts任务，images任务，html任务
 * 之前先执行clean任务
 */
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'html');
});

/*
 * 监视任务，监听less文件，js文件，图片文件和html文件的变更
 */
gulp.task('watch', function() {

    //监听所有.less
    gulp.watch('src/less/*.less', ['styles']);

    //监听所有.js文件
    gulp.watch('src/js/*.js', ['scripts']);

    //监听所有图片文件
    gulp.watch('src/img/*', ['images']);

    //监听html文件
    gulp.watch('src/*.html', ['html']);
});

/*
 * server任务，执行connect任务和watch任务
 */
gulp.task('server', ['connect', 'watch']);
```

* 不含 ES6 的 js 文件任务

```JavaScript
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
    	.pipe(gulp.dest('dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.init({loadMaps: true}))
    	.pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .on('error', gutil.log)
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});
```
