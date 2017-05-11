const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/javascript/app.js', 'public/javascript')
  .extract(['axios','jquery','vue'])
  .copy('node_modules/font-awesome/fonts', 'public/fonts')
  .sass('resources/sass/vendor.sass', 'public/css')
  .stylus('resources/stylus/main.styl', 'public/css')
  .disableNotifications()
  //.version() breaks with HMR

if  (mix.config.inProduction)
  mix.version();

