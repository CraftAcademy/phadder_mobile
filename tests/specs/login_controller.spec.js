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
      200, valid_response
    );

    controller = $controller('LoginController', {
      $scope: $scope,
      $state: $state,
      $ionicModal: $ionicModal,
      $rootScope: $rootScope
      //loginService: loginService

    });

    httpBackend
      .when('POST', 'https://unify-develop.herokuapp.com/api/v1/users/sign_in')
      .respond(valid_response);
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

    });


    describe('#performLogin', function () {

      beforeEach(function () {
          httpBackend.expectPOST('https://unify-develop.herokuapp.com/api/v1/users/sign_in');
          $scope.performLogin('random@random.com', 'password');
          //httpBackend.flush();
        }
      );

      xit('should return a user object', function () {
        console.log($rootScope.currentUser);
        expect(typeof $rootScope.currentUser).toBeDefined();
        expect(typeof $rootScope.currentUser).toBe("object");
        expect($rootScope.currentUser.user_name).toBe('Random Guy');
      });


    });

  });

});
