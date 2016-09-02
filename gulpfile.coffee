gulp         = require 'gulp'
sync         = require('browser-sync').create()
notify       = require 'gulp-notify'

rollup       = require 'rollup-stream'
rollupc      = require 'rollup-plugin-coffee-script'

coffee       = require 'gulp-coffee'

source       = require 'vinyl-source-stream'
buffer       = require 'vinyl-buffer'
uglify       = require 'gulp-uglify'
clean        = require 'gulp-clean-css'
htmlmin      = require 'gulp-htmlmin'
concat       = require 'gulp-concat'
stylus       = require 'gulp-stylus'
pug          = require 'gulp-pug'
sourcemaps   = require 'gulp-sourcemaps'
gulpif       = require 'gulp-if'
fs           = require 'fs'
objectus     = require 'objectus'

env = 'dev'

dirs =
  coffee: 'resources/coffee'
  pug:    'resources/views'
  stylus: 'resources/stylus'
  svg:    'resources/vector'

objectify = ->
  config = {}
  objectus 'config/', (error, result) =>
    notify error if error
    @config = result
    pubconfig = @config
    delete pubconfig.auth
    fs.writeFileSync(dirs.coffee + '/config.coffee', "config = " + JSON.stringify(pubconfig) + ";", 'utf8')
    
objectify()

gulp.task 'objectus', objectify

gulp.task 'goprod', ->
  env = 'prod'

gulp.task 'vendor', ->

  gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/json-browse/json-browse/jquery.json-browse.js',
    'node_modules/gsap/src/uncompressed/TweenMax.js',
    'public/js/MorphSVGPlugin.min.js',
  ])

  .pipe(gulpif(env != 'dev',uglify()))
  .pipe(concat('vendor.js'))
  .pipe gulp.dest('public/js/')


  gulp.src([
    'node_modules/json-browse/json-browse/jquery.json-browse.css',
  ])

  .pipe(gulpif(env != 'dev',clean()))
  .pipe(concat('vendor.css'))
  .pipe gulp.dest('public/css/')


gulp.task 'coffee', ->
  gulp.src(dirs.coffee + '/*.coffee')
    .pipe(gulpif(env == 'dev', sourcemaps.init(loadMaps: true)))
    .pipe(coffee(bare: true)
      .on('error', notify.onError((error) ->
        title: "Coffee error"
        message: error.message + "\r\n" + error.filename + ':' + error.location.first_line
        sound: 'Pop'
      )))
    .pipe(gulpif(env != 'dev',uglify()))
    .pipe(concat('bundle.js'))
    .pipe(gulpif(env == 'dev',sourcemaps.write()))
    .pipe(gulp.dest('./public/js'))
    .pipe(sync.stream())

gulp.task 'rollup', ->
  
  rollup(
    entry: dirs.coffee + '/main.coffee'
    plugins: [
      rollupc()
    ]
    format: 'iife'
    sourceMap: (env == 'dev')
  )
    .on('error', notify.onError((error) ->
      title: 'Rollup error: ' + error.name
      message: error.message
      sound: 'Pop'
    ))

  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(gulpif(env == 'dev', sourcemaps.init(loadMaps: true)))
  .pipe(gulpif(env != 'dev',uglify()))
  .pipe(gulpif(env == 'dev',sourcemaps.write()))
  .pipe(gulp.dest('public/js'))
  .pipe sync.stream()

gulp.task 'stylus', ->
  gulp.src(dirs.stylus + '/main.styl')
    .pipe(gulpif(env == 'dev',sourcemaps.init(loadMaps: true)))
    .pipe(stylus(rawDefine: config: config)
    .on('error', notify.onError((error) ->
      title: 'Stylus error: ' + error.name
      message: error.message
      sound: 'Pop'
    )))
    .pipe(gulpif(env != 'dev',clean()))
    .pipe(gulpif(env == 'dev',sourcemaps.write()))
    .pipe(gulp.dest('public/css/'))
    .pipe(sync.stream())

gulp.task 'php', ->
  sync.reload()

watch = ->
  gulp.watch '**/*.php', ['php']
  gulp.watch 'config/**/*', ['objectus','php','stylus']
  gulp.watch dirs.coffee + '/**/*.coffee', ['coffee']
  gulp.watch dirs.stylus + '/**/*.styl', ['stylus']
  gulp.watch dirs.pug + '/**/*.pug', ['php']
  gulp.watch dirs.svg + '/**/*.svg', ['php']
  gulp.watch 'public/images/**/*', ['php']



gulp.task 'sync', ->
  sync.init
    notify: false
    open: false
    proxy:
      target: 'basal.dev:8080',
      reqHeaders: ->
        host: 'basal.dev:3000'
    ghostMode:
      clicks: false
      forms: false
      scroll: false
    scrollProportionally: false

  watch()

gulp.task 'watch', watch
gulp.task 'default', ['objectus','stylus','vendor','coffee']
gulp.task 'prod', ['goprod','default']
