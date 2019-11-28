let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
exports.config = {
    specs: ['tests/TraditionalTests.js'],
    capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--window-size=1024,768']
      },
      count: 1,
      shardTestFiles: true,
      maxInstances: 1,
      seleniumAddress: 'http://localhost:4444/wd/hub'
    },
    onPrepare: function () {
      jasmine.getEnv().addReporter(new SpecReporter({
        spec: {
          displayStacktrace: true
        }
      }));
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;
    }
  };