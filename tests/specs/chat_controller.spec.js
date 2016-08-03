describe('ChatCtrl', function () {

  var $scope, controller, httpBackend, $rootScope, userFixture;

  beforeEach(module('project_unify'));

  beforeEach(inject(function (_$rootScope_,
                              $controller,
                              $httpBackend,
                              $ionicModal) {


    $rootScope = _$rootScope_;
    userFixture = readJSON('fixtures/current_user.json');
    $rootScope.currentUser.user = userFixture;
    $scope = $rootScope.$new();
    httpBackend = $httpBackend;
    controller = $controller('ChatCtrl', {
      $scope: $scope,
      $ionicModal: $ionicModal,
      $rootScope: $rootScope

    });



  }));


  describe('controller functions', function () {

    it('should exist', function () {
      expect(controller).toBeDefined();
    });

    xit('should have a $scope', function () {
      expect($scope).toBeDefined();
    });

    xit('should respond to #sendReply', function () {
      expect(typeof $scope.sendReply).toBeDefined();
      expect(typeof $scope.sendReply).toBe("function");
    });

    xit('should respond to #getById', function () {
      expect(typeof getById).toBeDefined()
      expect(typeof getById).toBe("function");
    });


  });

});
