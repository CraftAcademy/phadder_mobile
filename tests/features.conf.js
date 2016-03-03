exports.config = {
  capabilities: {
    'browserName': 'phantomjs',
    'phantomjs.binary.path': require('phantomjs').path,
    'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
  },
  baseUrl: 'http://localhost:8100',
  specs: [
    'features/**/*.feature.js'
  ],
  jasmineNodeOpts: {
    isVerbose: true
  }
};
