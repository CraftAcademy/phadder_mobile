// Karma configuration
// Generated on Sat Feb 27 2016 09:31:12 GMT+0100 (CET)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // Load jQuery from CDN
      'https://code.jquery.com/jquery-3.1.0.min.js',
      //Angular/Ionic sources (we need to add all dependencies).
      '../www/lib/karma-read-json/karma-read-json.js',
      '../www/lib/ionic/js/ionic.bundle.js',
      '../www/lib/ionic-platform-web-client/dist/ionic.io.bundle.min.js',
      '../www/lib/ngCordova/dist/ng-cordova.js',
      '../www/lib/angular/angular.js',
      '../www/lib/angular-timeago/dist/angular-timeago.js',
      '../www/lib/ngmap/build/scripts/ng-map.min.js',
      '../www/lib/angular-ui-router/release/angular-ui-router.js',
      '../www/lib/angular-mocks/angular-mocks.js',
      '../www/lib/angular-resource/angular-resource.js',
      '../www/lib/angular-gravatar/build/angular-gravatar.js',

      //App code (load all js files)
      '../www/js/**/*.js',

      //Test/Spec files
      'specs/**/*.spec.js',

      // fixtures
      {pattern: 'fixtures/*.json', included: false}
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "**/lib/*js": "coverage"
    },

    coverageReporter: {
      type: "lcov",
      dir: "coverage/"
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage', 'coveralls'],


    // web server port
    port: 9876,

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-coveralls',
      "karma-spec-reporter"
    ],


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['customChrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    customLaunchers: {
      customChrome: {
        base: 'Chrome',
        flags: ['--no-sandbox', '--disable-web-security'],
        displayName: 'Chrome w/o security'
      }
    }
  });
  if (process.env.SEMAPHORE) {
    config.browsers = ['customChrome'];
  }
}
