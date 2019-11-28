var EC = protractor.ExpectedConditions;
var getTableAsJSON = require('../functions/getTableJSON');
var reportUtils = require('../functions/reportUtils');
describe('Test login page elements', function() {
  it('Validate page header', function() {
    browser.waitForAngularEnabled(false);
    browser.get('https://demo.applitools.com/hackathonV2.html');
    browser.getTitle().then((sPageTitle)=>{
      reportUtils(sPageTitle,"ACME demo app");
    })
  });
  it('Validate Auth header', function() {
    $('.auth-header').getText().then((sTitle)=>{
      reportUtils(sTitle,"Login Form");
    })
  });
  it('Validate username label', function() {
    element(by.xpath('//*[@id="username"]/preceding-sibling::label')).getText().then((sLabelUserName)=>{
      reportUtils(sLabelUserName,"Username");
    })
  });
  it('Validate username field', function() {
    element(by.css('[id="username"]')).getAttribute("placeholder").then((userNameLabel) => {
      reportUtils(userNameLabel,"Enter your username");
    });
  });
  it('Validate password label', function() {
    element(by.xpath('//*[@id="password"]/preceding-sibling::label')).getText().then((sLabelPassword) => {
      reportUtils(sLabelPassword,"Password");
    });
  });
  it('Validate password field', function() {
    element(by.id('password')).getAttribute("placeholder").then((passwordLabel) => {
      reportUtils(passwordLabel,"Enter your password");
    });
  });
  it('Validate Login button', function() {
    element(by.id('log-in')).getText().then((loginButtonText) => {
      reportUtils(loginButtonText,"Log In");
    });
  });
  it('Validate Remember Me checkbox', function() {
    element(by.className('form-check-label')).getText().then((rememberMeText) => {
      reportUtils(rememberMeText,"Remember Me");
    });
  });
});
describe('Test login functionality', function() {
  it('Validate empty value login', function() {
    element(by.id('log-in')).click()
    element(by.className('alert-warning')).getText().then((sAlertText)=>{
      reportUtils(sAlertText,"Please enter both username and password")
    })
  });
  it('Validate empty password login', function() {
    element(by.id('username')).sendKeys("testUser");
    element(by.id('log-in')).click();
    element(by.className('alert-warning')).getText().then((sAlertText)=>{
      reportUtils(sAlertText,"Password must be present");
    })
    element(by.id('username')).clear();
  });
  it('Validate empty username login', function() {
    element(by.id('password')).sendKeys("testPassword")
    element(by.id('log-in')).click()
    element(by.className('alert-warning')).getText().then((sAlertText)=>{
      reportUtils(sAlertText,"Username must be present")
    })
  });
  it('Validate valid login', function() {
    element(by.id('username')).sendKeys("testUser");
    element(by.id('password')).sendKeys("testPassword")
    element(by.id('log-in')).click()
    browser.wait(EC.visibilityOf(element(by.id('showExpensesChart'))), 5000).then(()=>{
      element(by.id('showExpensesChart')).getText().then((sChartTitle)=>{
        reportUtils(sChartTitle,"Compare Expenses")
      })
    })
  });
});
describe('Table sort Test', function() {
  it('Validate values from Table', async function(done) {
    let valSort = await getTableAsJSON('//*[@id="transactionsTable"]/tbody/tr','td','amount');
    reportUtils(valSort,true)
    done();
  });
  
});
describe('Canvas Chart Test', function() {
  it('Validate Chart Values for Compare Expenses', async function(done) {
    browser.wait(EC.visibilityOf(element(by.id('showExpensesChart'))), 5000).then(()=>{
      element(by.id('showExpensesChart')).click()
    }).then(()=>{
      browser.wait(EC.visibilityOf(element(by.id('canvas'))), 5000).then(()=>{
        console.log("Visual Comparison not possible for charts")
      })
    }).then(()=>{
      browser.wait(EC.visibilityOf(element(by.id('addDataset'))), 5000).then(()=>{
        element(by.id('addDataset')).click()
      }).then(()=>{
        browser.wait(EC.visibilityOf(element(by.id('canvas'))), 5000).then(()=>{
          console.log("Visual Comparison not possible for charts")
        })
      }).then(()=>{
        done();
      })
    })
  });
});
describe('Dynamic Content Test', function() {
  it('Login with ad enabled', function() {
    browser.waitForAngularEnabled(false);
    browser.get('https://demo.applitools.com/hackathonV2.html?showAd=true');
    browser.getTitle((sPageTitle) => {
      reportUtils(sPageTitle,"ACME demo app");
    }).then(()=> {
      element(by.id('username')).sendKeys("testUser");
      element(by.id('password')).sendKeys("testPassword")
      element(by.id('log-in')).click()
      browser.wait(EC.visibilityOf(element(by.id('showExpensesChart'))), 5000).then(()=>{
        element(by.id('showExpensesChart')).getText().then((sChartTitle)=>{
          reportUtils(sChartTitle,"Compare Expenses")
        })
      })
    })
  });
  it('Validate Flash content 1 for ads', function() {
    browser.wait(EC.visibilityOf(element(by.id('flashSale'))), 5000).then(()=>{
      element(by.id('flashSale')).isDisplayed().then((sDisp)=>{
        reportUtils(sDisp,true);
      })
    }).then(()=>{
      console.log("Visual Ad content cannot be validated")
    })
  })
  it('Validate Flash content 2 for ads', function() {
    browser.wait(EC.visibilityOf(element(by.id('flashSale2'))), 5000).then(()=>{
      element(by.id('flashSale2')).isDisplayed().then((sDisp)=>{
        reportUtils(sDisp,true);
      })
    }).then(()=>{
      console.log("Visual Ad content cannot be validated")
    });
  })
});