angular.module('project_unify.controllers', [])

  .controller('FriendshipCtrl', function ($rootScope, $scope, friendshipService, friendService) {
    $scope.sendFriendshipRequest = function (user) {
      friendshipService.get({friend_id: user.id}, function (data) {
        $rootScope.friendship_request_message = data.message;
        $rootScope.requestJustSent = true;
      });
    }

    $scope.confirmFriendshipRequest = function (user) {
      friendService.acceptFriend(user.id, function (data) {
        $rootScope.friendship_confirmation_message = data.message;
        $rootScope.justConfirmedFriendship = true;
      });
    }

    $scope.blockFriendshipRequest = function (user) {
      friendService.blockFriend(user.id, function (data) {
        $rootScope.friendship_block_message = data.message;
        $rootScope.justBlockedFriendship = true;
      });
    }
  })

  //Rename this to application controller and split up?
  .controller('DemoCtrl', function ($scope,
                                    NgMap,
                                    $rootScope,
                                    $ionicSideMenuDelegate,
                                    $ionicModal,
                                    $ionicLoading,
                                    $state,
                                    $timeout,
                                    unifyService,
                                    skillsService,
                                    userService,
                                    feedService,
                                    $stateParams,
                                    friendshipStatusService) {
    NgMap.getMap().then(function (map) {
      console.log(map.getCenter());
    });

    $rootScope.friendship_block_message = undefined;
    $rootScope.friendship_request_message = undefined;
    $rootScope.friendship_confirmation_message = undefined;
    $rootScope.requestJustSent = false;
    $rootScope.justBlockedFriendship = false;
    $rootScope.justConfirmedFriendship = false;

    $scope.activityFeed = feedService.get();
    $scope.user = $stateParams.user;

    $scope.selectFeed = function (item) {
      $scope.openViewPost(item);
    };

    $scope.displayProfile = function (user) {
      var displayUser = userService.get({id: user.id}, function () {
        if (user.id == $scope.currentUser.id) {
          $state.go('tab.profile', {user: $scope.currentUser}, {reload: true});
        } else {
          $state.go('tab.profile', {user: displayUser.user}, {reload: true});
        }
      });

    };

    $scope.updateSkillList = function (user) {
      return user.skills.map(function (obj) {
        return obj;
      }).join(', ');
    };
    $scope.currentUser = $rootScope.currentUser.user;
    $scope.currentUser.skill_list = $scope.updateSkillList($scope.currentUser);

    //horrible hacking!
    if ($scope.user && ($scope.user.id != $scope.currentUser.id)){
      $scope.isFriend = friendshipStatusService.isFriend($scope.user);
      $scope.hasInvitedCurrentUser = friendshipStatusService.hasInvitedCurrentUser($scope.user);
      $scope.requestPending = friendshipStatusService.pending($scope.user);
      $scope.blockedByCurrentUser = friendshipStatusService.blockedByCurrentUser($scope.user);
    }

    $scope.unifyMe = function (id) {
      $scope.showLoading('Please wait...');
      unifyService.get({id: id}, function (data) {
        $scope.matches = data.matches;
        $scope.hideLoading();
      });
    };

    $scope.doSkillsUpdate = function (skills) {
      skillsService.save({id: $scope.currentUser.id}, {skills: skills}, function () {
        $scope.closeSkills();
      });
      userService.get({id: $scope.currentUser.id}, function (response) {
        $scope.currentUser = response.user;
        $scope.currentUser.skill_list = $scope.updateSkillList(response.user);
      });
    };

    $scope.toggleMenu = function () {
      $ionicSideMenuDelegate.toggleRight();
    };

    $scope.refresh = function () {
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.goToHome = function () {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
      });

      $timeout(function () {
        $ionicLoading.hide();
        $state.go('tab.home');
        $scope.closeLogin();
        $scope.closeRegister();
      }, 2000);
    };

    $scope.actionSheet = function () {
      var hideSheet = $ionicActionSheet.show({
        // titleText: 'Modify your album',
        buttons: [
          {text: 'Block or report'},
          {text: 'Copy Link'}
        ],
        destructiveText: 'Delete',
        cancelText: 'Cancel',
        cancel: function () {
          // add cancel code..
        },
        buttonClicked: function (index) {
          return true;
        }
      });
    };

    // Add connection modal
    $ionicModal.fromTemplateUrl('templates/modal/new_connection.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalAdd = modal;
    });
    $scope.openAdd = function () {
      $scope.modalAdd.show();
    };
    $scope.closeAdd = function () {
      $scope.modalAdd.hide();
    };

    // View Post modal
    $ionicModal.fromTemplateUrl('templates/home/post.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalViewPost = modal;
    });
    $scope.openViewPost = function (item) {
      $scope.selectedFeedItem = item;
      $scope.modalViewPost.show();
    };
    $scope.closeViewPost = function () {
      $scope.modalViewPost.hide();
    };

    // New Post modal
    $ionicModal.fromTemplateUrl('templates/modal/new_post.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalPost = modal;
    });
    $scope.openPost = function () {
      $scope.modalPost.show();
    };
    $scope.closePost = function () {
      $scope.modalPost.hide();
    };

    // Skills modal
    $ionicModal.fromTemplateUrl('templates/me/skills.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalSkills = modal;
    });
    $scope.openSkills = function () {
      $scope.modalSkills.show();
    };
    $scope.closeSkills = function () {
      $scope.modalSkills.hide();
    };


    // Tinder cards
    $scope.cards = [
      {
        image: 'img/adam.jpg'
      },
      {
        image: 'img/ben.png'
      },
      {
        image: 'img/adam.jpg'
      },
      {
        image: 'img/ben.png'
      }
    ];

    $scope.cardDestroyed = function (index) {
      $scope.cards.splice(index, 1);
    };

    $scope.cardSwiped = function (index) {
      var newCard = // new card data
        $scope.cards.push(newCard);
    };

    $scope.cardSwipedLeft = function (event, index) {
      event.stopPropagation();
    }

    $scope.cardSwipedRight = function (event, index) {
      event.stopPropagation();
    }

    //Loading
    $scope.showLoading = function (message) {
      $ionicLoading.show({
        template: message,
        duration: 1500
      });
    };
    $scope.hideLoading = function () {
      $ionicLoading.hide();
    };

  });
