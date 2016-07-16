projectUnify.controller('LoginController', function ($q,
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
  //$rootScope.currentUser = {};
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
    //Extract to factory?
    var url = 'https://unify-develop.herokuapp.com/api/v1/users/auth/facebook';
    var callbackUrl = 'https://unify-develop.herokuapp.com/api/v1/users/auth/facebook/callback';
    var deferred = $q.defer();
    var dialog = window.open(url, '_blank', 'hidden=yes');
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
      console.log($scope.currentUser);
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
    });
  };

  // Perform User actions
  $scope.handleCurrentUser = function (user) {
    $rootScope.currentUser = user;
    console.log($rootScope.currentUser);
    $rootScope.currentUser.user = angular.extend($rootScope.currentUser.user, $scope.currentLocation);
    $scope.setToken(user);
    return $rootScope.currentUser.user;
  };

  // Display error
  $scope.handleError = function (e) {
    $scope.errors = e;
    $scope.openError();
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
