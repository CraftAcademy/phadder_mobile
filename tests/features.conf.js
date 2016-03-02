exports.config = {
  capabilities: {
    'browserName': 'phantomjs'
  },
  baseUrl: 'http://localhost:8100',
  specs: [
    'features/**/*.feature.js'
  ],
  jasmineNodeOpts: {
    isVerbose: true
  }
};
