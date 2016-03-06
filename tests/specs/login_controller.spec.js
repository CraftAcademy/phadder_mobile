describe('LoginController', function () {


  var $scope, controller, httpBackend;

  beforeEach(module('project_unify'));

  beforeEach(inject(function ($rootScope,
                              $controller,
                              $state,
                              $httpBackend,
                              $ionicModal) {

    $scope = $rootScope.$new();
    httpBackend = $httpBackend;
    var valid_response = readJSON('fixtures/current_user.json');
    httpBackend.whenGET(/.*/).respond(
      valid_response
    );

    controller = $controller('LoginController', {
      $scope: $scope,
      $state: $state,
      $ionicModal: $ionicModal

    });
  }));


  describe('controller functions', function () {

    it('should exist', function () {
      expect(controller).toBeDefined();
    });

    it('should have a $scope', function () {
      expect($scope).toBeDefined();
    });

    it('should respond to #openLogin', function () {
      expect(typeof $scope.openLogin).toBeDefined();
      expect(typeof $scope.openLogin).toBe("function");
    });

    it('should respond to #closeLogin', function () {
      expect(typeof $scope.closeLogin).toBeDefined()
      expect(typeof $scope.closeLogin).toBe("function");
    });

    xit('should have a #showCard status', function () {
      expect(typeof $scope.showCard).toBeDefined();
      expect(typeof $scope.showCard).toBe("boolean");
    });

    xit('should have a #searchResult object', function () {
      expect(typeof $scope.searchResult).toBeDefined();
      expect(typeof $scope.searchResult).toBe("object");
    });

    xit('should have a #error object', function () {
      expect(typeof $scope.error).toBeDefined();
      expect(typeof $scope.error).toBe("object");
    });


    describe('when initialized', function () {
      xit('#productList is empty', function () {
        expect($scope.searchResult).toBe(null);
      });

      xit('showScan is set to false', function () {
        expect($scope.showScan).toBe(false);
      });

      xit('showCard is set to false', function () {
        expect($scope.showCard).toBe(false);
      });

    });

    describe('#performLogin', function () {

      beforeEach(function () {
          loginService.login({user: {email: 'random@random.com', token: 'xxxxxx'}});
          httpBackend.flush();
        }
      );

      xit('should return a user object', function () {
        expect($scope.searchResult.product_name).toBe('Fiberrost');
      });

      xit('should set $rootScope#currentUser', function () {
        var currentUser = {email: 'random@random.com', token: 'xxxxxx'};
        $scope.searchProduct('2222');
        httpBackend.flush();
        expect($rootScope.currentUser).toBe(currentUser);
      });

    });

  });

});
