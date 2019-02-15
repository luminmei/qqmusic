
var gulp = require("gulp");

// 压缩html
// 插件的应用  下载插件 --》 取到插件--》 应用插件
var htmlClean = require("gulp-htmlclean");

// 压缩图片插件
var imageMin = require("gulp-imagemin");

// 压缩js插件
var uglify = require("gulp-uglify");

// 去掉js中的调试语句 包括debugger
var gulpStripDebug = require("gulp-strip-debug");

// 将less转为css插件
var less = require("gulp-less");

// 压缩css插件
var cleancss = require("gulp-clean-css")

// 给css3添加兼容前缀
// 需要两个插件 gulp-postcss autoprefixer
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

// 开启本地服务器的代理
var connect = require("gulp-connect")

var folder = {
  src: "src/",
  dist: "dist/"
}


// 获取到当前的环境变量，生产环境就压缩
// export NODE_ENV=development 设置环境变量
var devMod = process.env.NODE_ENV == "development";

// 第一个参数是任务的名字，第二个参数是任务做的事情
gulp.task("html", function () {
  var page = gulp.src(folder.src + "html/*") // 变成文件流
  .pipe(connect.reload()) // 调用刷新  改变的是文件的内容，不是在页面刷新
  if (!devMod) { // 生产环境
    page.pipe(htmlClean()) // 应用插件压缩html文件
  }   
  page.pipe(gulp.dest(folder.dist + "html/")) // 输出到管道pipe,然后利用gulp.dest写入
})
gulp.task("image", function () {
  gulp.src(folder.src + "image/*")
  .pipe(imageMin()) // 压缩图片
    .pipe(gulp.dest(folder.dist + "image/")) // 输出到管道pipe,然后利用gulp.dest写入
})
gulp.task("css", function () {
  var page = gulp.src(folder.src + "css/*")
  .pipe(connect.reload()) // 调用刷新
    .pipe(less())
    .pipe(postCss([autoprefixer()])) // 参数的形式传给它，是数组可以放多个
    if (!devMod) { // 生产环境
      page.pipe(cleancss()) // 压缩css代码
    }
    page.pipe(gulp.dest(folder.dist + "css/")) // 输出到管道pipe,然后利用gulp.dest写入
})
gulp.task("js", function () {
  var page = gulp.src(folder.src + "js/*")
  .pipe(connect.reload()) // 调用刷新
  if (!devMod) { // 生产环境
    page.pipe(gulpStripDebug())
    page.pipe(uglify())
  }
  page.pipe(gulp.dest(folder.dist + "js/")) // 输出到管道pipe,然后利用gulp.dest写入
})



gulp.task("server", function () {
    connect.server({
      port: "8888",
      livereload: true // 开启自动刷新
    })
})

// 开启监听文件变化，变化后就去执行任务（在任务里reload刷新）
gulp.task("watch", function () {
  gulp.watch(folder.src + "html/*", ["html"]) // 这个文件夹下改变了，就去触发html任务  
  gulp.watch(folder.src + "css/*", ["css"])
  gulp.watch(folder.src + "js/*", ["js"])
})
// 相当于项目的init  默认任务
// 第二个参数是依赖哪个任务的执行
gulp.task("default", ["html", "image", "css", "js", "server", "watch"]) // 任务队列

// less --》 自动添加css3前缀--》压缩---》css文件

// 就四个api
// gulp.src()
// gulp.dest()
// gulp.task()
// gulp.watch()