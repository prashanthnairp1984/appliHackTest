let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['tests/TraditionalTests.js'],
    onPrepare: function () {
      jasmine.getEnv().addReporter(new SpecReporter({
        spec: {
          displayStacktrace: true
        }
      }));
    }
  };