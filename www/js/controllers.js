angular.module('project_unify.controllers', [])

  .controller('LoginController', function ($q,
                                           $http,
                                           $scope,
                                           $rootScope,
                                           $cordovaInAppBrowser,
                                           $cordovaGeolocation,
                                           $state,
                                           $ionicModal,
                                           loginService,
                                           signUpService,
                                           $ionicLoading,
                                           $stateParams) {
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        $scope.currentLocation = {latitude: lat, longitude: long}
      }, function (err) {
        // error
      });

    $scope.customFacebookLogin = function () {
      var promise = doLogin();
      promise.then(function () {
        $scope.handleCurrentUser($scope.response);
        $scope.closeLogin();
        $state.go('tab.profile');
      }, function (reason) {
        $scope.statusText = reason;
      });

    };

    function doLogin() {
      var url = 'https://unify-develop.herokuapp.com/api/v1/users/auth/facebook';
      var callbackUrl = 'https://unify-develop.herokuapp.com/api/v1/users/auth/facebook/callback';
      var deferred = $q.defer();
      var dialog = window.open(url, '_blank', 'hidden=no');
      dialog.addEventListener("loadstop", function (event) {
        if ((event.url).indexOf(callbackUrl) === 0) {
          dialog.executeScript(
            {code: "document.getElementsByTagName('pre')[0].innerHTML"},
            function (values) {
              $scope.response = JSON.parse(values[0]);
              dialog.removeEventListener("exit", function (event) {
              });
              dialog.close();
            }, function (error) {
              deferred.reject("Problem authenticating" + error);
            }
          );
          deferred.resolve({result: $scope.response});
        }
      });
      dialog.addEventListener('exit', function () {
        deferred.reject("The sign in flow was canceled");
      });
      return deferred.promise;
    }


    $scope.performLogin = function (email, password) {
      loginService.save({user: {email: email, password: password}}, function (user) {
        $scope.closeLogin();
        $scope.handleCurrentUser(user);

        $state.go('tab.profile', {user: $rootScope.currentUser.user});
      }, function (response) {
        $scope.statusText = response.data.error;
      });
    };

    $scope.doSignUp = function (user_name, email, password, passwordConfirmation) {
      attributes = {
        user: {
          user_name: user_name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
          latitude: $scope.currentLocation.latitude,
          longitude: $scope.currentLocation.longitude
        }
      };

      signUpService.save(angular.extend(attributes), function (user) {
        console.log(user);
        $scope.closeRegister();
        $scope.handleCurrentUser(user);
      }, function (response) {
        var statusText = 'Errors: ';
        for (var key in response.data.errors) {
          var value = response.data.errors[key];
          var new_key = key.toLowerCase().replace(/(?:^|\s|-)\S/g, function (c) {
            return c.toUpperCase();
          });
          statusText = statusText + [new_key, value].join(' ') + ' ';
        }
        $scope.statusText = statusText;
        console.log(attributes.user);


      });
    };

    // Perform User actions
    $scope.handleCurrentUser = function (user) {
      $rootScope.currentUser = user;
      $rootScope.currentUser.user = angular.extend($rootScope.currentUser.user, $scope.currentLocation);
      $scope.setToken(user);
      return $rootScope.currentUser.user;
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
      $scope.statusText = '';
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
      $scope.statusText = '';
      $scope.modalRegister.hide();
    };

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

  })


  .controller('DemoCtrl', function ($scope,
                                    NgMap,
                                    $rootScope,
                                    $ionicSideMenuDelegate,
                                    $ionicModal,
                                    Users,
                                    $ionicLoading,
                                    $state,
                                    $timeout,
                                    unifyService,
                                    skillsService,
                                    userService,
                                    feedService,
                                    $stateParams,
                                    $window) {
    NgMap.getMap().then(function (map) {
      console.log(map.getCenter());
    });

    $scope.activityFeed = feedService.get();
    $scope.user = $stateParams.user;

    $scope.selectFeed = function (item) {
      $scope.openViewPost(item);
    };

    $scope.displayProfile = function (user) {
      var displayUser = userService.get({id: user.id}, function(){
        console.log(displayUser.user);
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
    $scope.users = Users.all();
    $scope.currentUser = $rootScope.currentUser.user;
    $scope.currentUser.skill_list = $scope.updateSkillList($scope.currentUser);


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

    //$scope.getFeed = function() {
    //  feedService.get({}, function(response){
    //    $scope.activityFeed = response;
    //    console.log(response)
    //  });
    //};

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
      console.log(event);
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
