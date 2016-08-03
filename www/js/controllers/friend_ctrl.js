projectUnify.controller('FriendCtrl', function ($scope,
                                                 $rootScope,
                                                 $stateParams,
                                                 $state,
                                                 $ionicModal,
                                                 $timeout,
                                                 userService,
                                                 friendService) {

  $scope.$on('$ionicView.enter', function () {
    $scope.currentUser = $rootScope.currentUser.user;
    $scope.allPendingFriends();
    $scope.allFriends();
    $scope.data = {};
  });


  $scope.allFriends = function () {
    friendService.friends(function(data){
      $scope.friends = data.users;
      console.log(data);
    })
  };

  $scope.allPendingFriends = function () {
    friendService.pendingFriends(function(data){
      $scope.pendingFriends = data.users;
      console.log(data);
    })
  };


});
