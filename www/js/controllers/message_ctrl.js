projectUnify.controller('MessageCtrl', function ($scope,
                                                 $rootScope,
                                                 $stateParams,
                                                 $state,
                                                 $ionicModal,
                                                 $timeout,
                                                 userService,
                                                 messageService) {

  $scope.$on('$ionicView.enter', function () {
    $scope.currentUser = $rootScope.currentUser.user;
    $scope.allMessages();
    userService.get({}, function (users) {
      $scope.users = users;
    });
    $scope.data = {};
  });

  (function tick() {
    messageService.messageCount(function (data) {
      $scope.messageCount = data;
    });
    messageService.getConversations(function (data) {
      $scope.conversations = data.conversations;
      console.log($scope.conversations);
    });
    $timeout(tick, 20000);

  })();

  $scope.getMessageCount = function () {
    messageService.messageCount(function (data) {
      $scope.messageCount = data;
    });
    console.log($scope.messageCount);

  };


  $scope.allMessages = function () {
    messageService.getConversations(function (data) {
      $scope.conversations = data.conversations;
      console.log($scope.conversations);
    })
  };

  $scope.sendMessage = function () {
    var recipient = $scope.data.recipient;
    var subject = $scope.data.subject;
    var body = $scope.data.body;
    var request = {receiver_id: recipient, subject: subject, message: body};
    messageService.composeMessage(request, function (data) {
      messageService.getConversations(function (response) {
          $scope.conversations = response.conversations;
          $scope.closeNewConversation();
        }
      );
    });
  };


  $scope.openChat = function (conversation) {
    $state.go('chat', {conversation: conversation});
  };

  // New Messsage modal
  $ionicModal.fromTemplateUrl('templates/modal/new_conversation.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalNewConversation = modal;
  });
  $scope.openNewConversation = function () {
    $scope.modalNewConversation.show();
  };
  $scope.closeNewConversation = function () {
    $scope.modalNewConversation.hide();
  };

})
