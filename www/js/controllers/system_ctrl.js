projectUnify.controller("SystemCtrl", function ($scope, $ionicLoading) {
  var deploy = new Ionic.Deploy();

  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function () {

    deploy.download().then(function () {
      $scope.show('Downloading update');
      deploy.extract().then(function () {
        deploy.load();
      }, function (error) {
        $scope.show('Error installing! ' + error);
      }, function (progress) {
        $scope.log = 'Installing ' + progress + '%';
      });
    }, function (error) {
      $scope.show('Error downloading! ' + error);
    }, function (progress) {
      $scope.show('Downloading.. ' + progress + '%');
    });

  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function () {
    $scope.show('Checking for updates');
    deploy.check().then(function (hasUpdate) {
      if (hasUpdate === true) {
        $scope.show('Update available.');
      } else {
        $scope.show('Latest version installed');
      }
      $scope.hasUpdate = hasUpdate;
    }, function (err) {
      $scope.show('Unable to check for updates' + err);
    });
  };


  $scope.show = function (message) {
    $ionicLoading.show({
      template: message,
      duration: 1500
    });
  };
  $scope.hide = function () {
    $ionicLoading.hide();
  };
})
