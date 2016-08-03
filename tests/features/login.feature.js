describe('Login feature', function () {
  var loginButton, usernameField, passwordField, signUpButton;

  beforeEach(function () {
    browser.get('/#');
    usernameField = element(by.model('email'));
    passwordField = element(by.model('password'));
    loginButton = element(by.buttonText('Sign in'));
    signUpButton = element(by.buttonText('Join now'));
  });

  it('should be on root path', function () {
    expect(browser.getLocationAbsUrl()).toMatch('/');
  });

  it('should route to login page', function () {
    loginButton.click().then(function () {
      expect(browser.getLocationAbsUrl()).toMatch('/welcome');
    });
  });

  describe('login', function () {
    beforeEach(function(){
      browser.get('/#');
      signUpButton.click();
      browser.debugger();
      usernameField.sendKeys('thomas@craftacademy.se');
      passwordField.sendKeys('password');
      loginButton.click();
    });

    it('logs in with valid credentials', function(){
      expect(browser.getLocationAbsUrl()).toMatch('/welcome');
    })
  });


});
