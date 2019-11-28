var EC = protractor.ExpectedConditions;
var getTableAsJSON = require('../functions/getTableJSON');
var reportUtils = require('../functions/reportUtils');
var Eyes = require("eyes.selenium").Eyes;
var eyes = new Eyes();
eyes.setApiKey("b9uW7T43x106T108nLmY6dlLy2bGnT1087WdZ3W0rnkwHCucE110");
describe('Test login page elements', function() {
  it('Validate page header', async function(done) {
    browser.waitForAngularEnabled(false);
    browser.get('https://demo.applitools.com/hackathonV2.html');
    await eyes.open(browser, "Visual AI Tests", "Applitools Hackathon 2019");
    await browser.getTitle().then(async (sPageTitle)=>{
      await eyes.checkWindow("Login Page")
      await reportUtils(sPageTitle,"ACME demo app");
    }).then(()=>{
      done();
    })
  });
  it('Validate Auth header', async function(done) {
    await $('.auth-header').getText().then(async (sTitle)=>{
      await reportUtils(sTitle,"Login Form");
    }).then(()=>{
      done();
    })
  });
  it('Validate username label', async function(done) {
    await element(by.xpath('//*[@id="username"]/preceding-sibling::label')).getText().then(async (sLabelUserName)=>{
      await reportUtils(sLabelUserName,"Username");
    }).then(()=>{
      done();
    })
  });
  it('Validate username field', async function(done) {
    await element(by.css('[id="username"]')).getAttribute("placeholder").then(async (userNameLabel) => {
      await reportUtils(userNameLabel,"Enter your username");
    }).then(()=>{
      done();
    });
  });
  it('Validate password label', async function(done) {
    await element(by.xpath('//*[@id="password"]/preceding-sibling::label')).getText().then(async (sLabelPassword) => {
      await reportUtils(sLabelPassword,"Password");
    }).then(()=>{
      done();
    });
  });
  it('Validate password field', async function(done) {
    await element(by.id('password')).getAttribute("placeholder").then(async (passwordLabel) => {
      await reportUtils(passwordLabel,"Enter your password");
    }).then(()=>{
      done();
    });
  });
  it('Validate Login button', async function(done) {
    await element(by.id('log-in')).getText().then(async (loginButtonText) => {
      await reportUtils(loginButtonText,"Log In");
    }).then(()=>{
      done();
    });
  });
  it('Validate Remember Me checkbox', async function(done) {
    await element(by.className('form-check-label')).getText().then(async (rememberMeText) => {
      await reportUtils(rememberMeText,"Remember Me");
    }).then(()=>{
      done();
    });
  });
});
describe('Test login functionality', function() {
  it('Validate empty value login', async function(done) {
    element(by.id('log-in')).click()
    await element(by.className('alert-warning')).getText().then(async (sAlertText)=>{
      await eyes.checkWindow("Empty Value Login")
      await reportUtils(sAlertText,"Both Username and Password must be present")
    }).then(()=>{
      done();
    })
  });
  it('Validate empty password login', function(done) {
    element(by.id('username')).sendKeys("testUser");
    element(by.id('log-in')).click();
    element(by.className('alert-warning')).getText().then(async (sAlertText)=>{
      await eyes.checkWindow("Empty Password Login")
      await reportUtils(sAlertText,"Password must be present");
    })
    element(by.id('username')).clear();
    done();
  });
  it('Validate empty username login', async function(done) {
    element(by.id('password')).sendKeys("testPassword")
    element(by.id('log-in')).click()
    await element(by.className('alert-warning')).getText().then(async (sAlertText)=>{
      await eyes.checkWindow("Empty Username Login")
      await reportUtils(sAlertText,"Username must be present")
    }).then(()=>{
      done();
    })
  });
  it('Validate valid login', async function(done) {
    element(by.id('username')).sendKeys("testUser");
    element(by.id('password')).sendKeys("testPassword")
    element(by.id('log-in')).click()
    await browser.wait(EC.visibilityOf(element(by.id('showExpensesChart'))), 5000).then(async ()=>{
      await element(by.id('showExpensesChart')).getText().then(async (sChartTitle)=>{
        await eyes.checkWindow("Login success")
        await reportUtils(sChartTitle,"Compare Expenses")
      })
    }).then(()=>{
      done();
    })
  });
});
describe('Table sort Test', function() {
  it('Validate values from Table', async function(done) {
    let valSort = await getTableAsJSON('//*[@id="transactionsTable"]/tbody/tr','td','amount');
    await eyes.checkWindow("After sort")
    await reportUtils(valSort,true)
    done();
  });
  
});
describe('Canvas Chart Test', function() {
  it('Validate Chart Values for Compare Expenses', async function(done) {
    browser.wait(EC.visibilityOf(element(by.id('showExpensesChart'))), 5000).then(()=>{
      element(by.id('showExpensesChart')).click()
    }).then(()=>{
      browser.wait(EC.visibilityOf(element(by.id('canvas'))), 5000).then(async ()=>{
        await eyes.checkWindow("Chart compare")
        console.log("Visual Comparison not possible for charts")
      })
    }).then(()=>{
      browser.wait(EC.visibilityOf(element(by.id('addDataset'))), 5000).then(()=>{
        element(by.id('addDataset')).click()
      }).then(()=>{
        browser.wait(EC.visibilityOf(element(by.id('canvas'))), 5000).then(async ()=>{
          await eyes.checkWindow("Chart compare next year")
          console.log("Visual Comparison not possible for charts")
        })
      }).then(async ()=>{
        await eyes.close();
        done();
      })
    })
  });
});
describe('Dynamic Content Test', function() {
  it('Login with ad enabled', async function(done) {
    browser.waitForAngularEnabled(false);
    browser.get('https://demo.applitools.com/hackathonV2.html?showAd=true');
    await eyes.open(browser, "Visual AI Tests Dynamic", "Applitools Hackathon 2019");
    browser.getTitle(async (sPageTitle) => {
      await reportUtils(sPageTitle,"ACME demo app");
    }).then(()=> {
      element(by.id('username')).sendKeys("testUser");
      element(by.id('password')).sendKeys("testPassword")
      element(by.id('log-in')).click()
      browser.wait(EC.visibilityOf(element(by.id('showExpensesChart'))), 5000).then(()=>{
        element(by.id('showExpensesChart')).getText().then(async (sChartTitle)=>{
          await eyes.checkWindow("Login success")
          await reportUtils(sChartTitle,"Compare Expenses")
        })
      })
    }).then(()=>{
      done();
    })
  });
  it('Validate Flash content 1 for ads', async function(done) {
    browser.wait(EC.visibilityOf(element(by.id('flashSale'))), 5000).then(()=>{
      element(by.id('flashSale')).isDisplayed().then(async (sDisp)=>{
        await reportUtils(sDisp,true);
      })
    }).then(()=>{
      console.log("Visual Ad content cannot be validated")
      done();
    })
  })
  it('Validate Flash content 2 for ads', async function(done) {
    browser.wait(EC.visibilityOf(element(by.id('flashSale2'))), 5000).then(()=>{
      element(by.id('flashSale2')).isDisplayed().then(async (sDisp)=>{
        await reportUtils(sDisp,true);
      })
    }).then(()=>{
      console.log("Visual Ad content cannot be validated")
    }).then(async ()=>{
      await eyes.checkWindow("Validate Dynamic Content")
      await eyes.close();
    }).then(()=>{
      done();
    });
  })
});