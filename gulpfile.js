var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var spritesmith = require('gulp.spritesmith');
var browserSync = require("browser-sync");//浏览器同步
var reload = browserSync.reload;

gulp.task("test",function(){
	return console.log("this is a test!")
})

// src中 匹配符“!”，“*”，“**”，“{}”的用法 *表示任意字符 **表示任意多个文件夹 ！表示不匹配 {}表示匹配指定某个 多个的话 用逗号分隔如 gulp.src(['src/js/*.js', '!src/js/**/{test1,test2}.js']) 

//创建一个build的多任务处理
gulp.task("build",["coffee","sass","image","html"]);


//复制文件操作(这三个任务是分别复制css js html到指定的目录下)

gulp.task("css",function(){
	return gulp.src("./src/css/*.css")
	.pipe(gulp.dest("./dist/static"));
})
gulp.task("html",function(){
	return gulp.src("./src/tpl/*.html")
	.pipe(gulp.dest("./dist"));
})
gulp.task("js",function(){
	return gulp.src("./src/js/*.js")
	.pipe(gulp.dest("./dist/static"));
})
gulp.task("copy",["css","html","js"]);


//正式的从这里开始
//创建一个css的处理任务
gulp.task("sass",function(){
	return gulp.src("./src/css/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("./dist/static"))
})
//创建一个uglify任务
gulp.task("ugli",function(){
	return gulp.src("./src/js/*.js")
	.pipe(uglify({
		mangle  : false,
		compress : true
	}))
	.pipe(gulp.dest("./dist/static"));
})
gulp.task("onlineBuild",["html","sass","ugli"]);



// 添加了监听以及实时刷新功能的task gulp

gulp.task("dev",["sass:dev","tpl:dev","js:dev","sprite:dev"],function(){
	browserSync.init({
		server : {
			baseDir : "./dist" //设置服务器的根目录为dist
		},
		notify : false //开启静默模式
	})

	gulp.watch("./src/css/*scss",["sass:dev"])
	gulp.watch("./src/js/*.js",["js:dev"])
	gulp.watch("./src/tpl/*.html",["tpl:dev"])
})

gulp.task("js:dev",function(){
	return gulp.src("./src/js/*.js")
	.pipe(uglify())
	.pipe(gulp.dest("./dist/static"))
	.pipe(reload({stream : true}));
})

gulp.task("sass:dev",function(){
	return gulp.src("./src/css/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("./dist/static/"))
	.pipe(reload({stream:true}));
})

gulp.task("tpl:dev",function(){
	return gulp.src("./src/tpl/*.html")
	.pipe(gulp.dest("./dist"))
	.pipe(reload({stream : true}));
})

gulp.task("sprite:dev",function(){
	return gulp.src("./src/images/*.png")
	.pipe(spritesmith({
		imgName: 'sprite.png',
    	cssName: 'sprite.css',
    	padding  : 2
	}))
	.pipe(gulp.dest("./dist/static/images"))
})


