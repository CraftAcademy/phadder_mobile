angular.module('project_unify.controllers', [])

  .controller('LoginController', function ($scope, $rootScope, $state, $ionicModal, loginService, signUpService) {
    $scope.performLogin = function (email, password) {
      loginService.save({user: {email: email, password: password}}, function (user) {
        $scope.closeLogin();
        $scope.handleCurrentUser(user);
        $state.go('tab.myprofile');
      });
    };

    $scope.doSignUp = function (user_name, email, password, passwordConfirmation) {
      signUpService.save({
        user: {
          user_name: user_name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation
        }
      }, function (user) {
        console.log(user);
        $scope.closeRegister();
        $scope.handleCurrentUser(user);
      });
    };

    // Facebook login - disabled
    $scope.doFacebook = function () {
      facebookService.get({},
        function (user) {
          // success
          if (user.errors.length === 0) {
            console.log(user);
            if ($scope.modalLogin.isShown()) {
              $scope.closeLogin;
            } else {
              $scope.closeRegister();
            }
            $scope.handleCurrentUser(user);
          } else {
            $scope.handleError(user);
          }
        }, function (e) {
          //request errors
          $scope.closeRegister();
          $scope.closeLogin;
          $scope.handleError(e);
        });

      //facebookService.save(function(user){
      //  $scope.closeRegister();
      //  $scope.handleCurrentUser(user);
      //});
    };

    // Perform User actions
    $scope.handleCurrentUser = function (user) {
      $rootScope.currentUser = user;
      $scope.setToken(user);
      $state.go('tab.me');
      console.log($rootScope.currentUser);
    };

    // Display error
    $scope.handleError = function (e) {
      $scope.errors = e;
      $scope.openError();
      console.log(e);
    };

    // Set token
    $scope.setToken = function (user) {
      $rootScope.token = user.token;
    };

    // Error modal
    $ionicModal.fromTemplateUrl('templates/modal/error.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalError = modal;
    });
    $scope.openError = function () {
      $scope.modalError.show();
    };
    $scope.closeError = function () {
      $scope.modalError.hide();
    };


    // Login modal
    $ionicModal.fromTemplateUrl('templates/welcome/login.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalLogin = modal;
    });
    $scope.openLogin = function () {
      $scope.modalLogin.show();
    };
    $scope.closeLogin = function () {
      $scope.modalLogin.hide();
    };

    // Sign up modal
    $ionicModal.fromTemplateUrl('templates/welcome/register.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalRegister = modal;
    });
    $scope.openRegister = function () {
      $scope.modalRegister.show();
    };
    $scope.closeRegister = function () {
      $scope.modalRegister.hide();
    };

  })


  .controller('DemoCtrl', function ($scope, $rootScope, $ionicSideMenuDelegate, $ionicModal, Users, $ionicLoading, $state, $timeout, unifyService, skillsService, userService) {
    $scope.updateSkillList = function(user){
      return user.skills.map(function(obj){return obj;}).join(', ');
    };
    $scope.users = Users.all();
    $scope.currentUser = $rootScope.currentUser.user;
    $scope.currentUser.skill_list = $scope.updateSkillList($scope.currentUser);


    $scope.unifyMe = function (id) {
      unifyService.get({id: id}, function (data) {
        $scope.matches = data.matches;
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
    }

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
    }

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
      console.log(event);
      event.stopPropagation();
    }

    $scope.cardSwipedRight = function (event, index) {
      event.stopPropagation();
    }
  });
