describe('LoginController', function () {


  var $scope, controller, httpBackend, $rootScope, loginService;

  beforeEach(module('project_unify'));

  beforeEach(inject(function (_$rootScope_,
                              $controller,
                              $state,
                              $httpBackend,
                              $ionicModal,
                              loginService) {

    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    httpBackend = $httpBackend;
    var valid_response = readJSON('fixtures/current_user.json');
    httpBackend.whenGET(/.*/).respond(
      valid_response
    );

    controller = $controller('LoginController', {
      $scope: $scope,
      $state: $state,
      $ionicModal: $ionicModal,
      $rootScope: $rootScope,
      loginService: loginService

    });
  }));


  describe('controller functions', function () {

    it('should exist', function () {
      expect(controller).toBeDefined();
    });

    it('should have a $scope', function () {
      expect($scope).toBeDefined();
    });

    it('should respond to #performLogin', function () {
      expect(typeof $scope.performLogin).toBeDefined();
      expect(typeof $scope.performLogin).toBe("function");
    });

    it('should respond to #doSignUp', function () {
      expect(typeof $scope.doSignUp).toBeDefined()
      expect(typeof $scope.doSignUp).toBe("function");
    });

    it('should respond to #customFacebookLogin', function () {
      expect(typeof $scope.customFacebookLogin).toBeDefined();
      expect(typeof $scope.customFacebookLogin).toBe("function");
    });

    it('should respond to #handleCurrentUser', function () {
      expect(typeof $scope.handleCurrentUser).toBeDefined()
      expect(typeof $scope.handleCurrentUser).toBe("function");
    });

    it('should respond to #handleError', function () {
      expect(typeof $scope.handleError).toBeDefined();
      expect(typeof $scope.handleError).toBe("function");
    });

    it('should respond to #setToken', function () {
      expect(typeof $scope.setToken).toBeDefined();
      expect(typeof $scope.setToken).toBe("function");
    });

    xit('should have a $rootScope.currentUser object', function () {
      expect(typeof $rootScope.currentUser).toBeDefined();
      expect(typeof $rootScope.currentUser).toBe("object");
    });


    describe('when initialized', function () {
      xit('#currentUser is empty', function () {
        expect($rootScope.currentUser).toBe(null);
      });
    });

    describe('#performLogin', function () {

      beforeEach(function () {
          loginService.save({user: {email: 'random@random.com', token: 'xxxxxx'}});
          httpBackend.flush();
        }
      );

      xit('should return a user object', function () {
        expect($rootScope.currentUser.user_name).toBe('Thomas Ochman');
      });


    });

  });

});
