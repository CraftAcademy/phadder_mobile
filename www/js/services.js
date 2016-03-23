angular.module('project_unify.services', [])


  .factory('signUpService', function ($resource) {
    return $resource('https://unify-develop.herokuapp.com/api/v1/users', {}, {
      save: {
        method: "POST",
        headers: {HTTP_ACCEPT: 'application/json'}
      }
    });
  })

  .factory('loginService', function ($resource) {
    return $resource('https://unify-develop.herokuapp.com/api/v1/users/sign_in');
  })

  .factory('oauthService', function ($resource) {
    return $resource('https://unify-develop.herokuapp.com/api/v1/users/auth/:provider');
  })

  .factory('unifyService', function ($rootScope, $resource) {
    var unify = $resource('https://unify-develop.herokuapp.com/api/v1/unify/:id', {}, {
      get: {
        method: 'GET',
        headers: {'X-User-Email': $rootScope.currentUser.user.email, 'X-User-Token': $rootScope.currentUser.user.token}
      }
    });

    return unify;
  })

  .factory('skillsService', function ($rootScope, $resource) {
    var skills = $resource('https://unify-develop.herokuapp.com/api/v1/skills/:id', {}, {
      save: {
        method: 'POST',
        headers: {'X-User-Email': $rootScope.currentUser.user.email, 'X-User-Token': $rootScope.currentUser.user.token}
      }
    });

    return skills;
  })

  .factory('messageService', function ($resource, $rootScope, $http) {
    var apiBase = 'https://unify-develop.herokuapp.com/api/v1/mailbox';
    var headers = {
      'X-User-Email': $rootScope.currentUser.user.email,
      'X-User-Token': $rootScope.currentUser.user.token
    };
    return {
      getConversations: function (callback) {
        $http.get(apiBase + '/conversations', {headers: headers}).success(callback);
      },
      composeMessage: function (data, callback) {
        $http.post(apiBase + '/conversations/compose', data, {headers: headers}).success(callback);
      },
      composeReply: function (data, callback) {
        $http.post(apiBase + '/conversations/reply', data, {headers: headers}).success(callback);
      },
      updateMessage: function (callback) {
        $http.post('https://unify-develop.herokuapp.com/api/v1/mailbox/conversations/:id', data, {headers: headers}).success(callback);
      },
      messageCount: function (callback) {
        $http.get('https://unify-develop.herokuapp.com/api/v1/mailbox/conversations/messages_count', {headers: headers}).success(callback);
      }
    }
  })

  .factory('userService', function ($rootScope, $resource) {
    var headers = {'X-User-Email': $rootScope.currentUser.user.email, 'X-User-Token': $rootScope.currentUser.user.token}
    var user = $resource('https://unify-develop.herokuapp.com/api/v1/users/:id', {}, {
      get: {
        headers: headers
      }
    });
    return user;
  })


  .factory('feedService', function ($rootScope, $resource) {
    var headers = {'X-User-Email': $rootScope.currentUser.user.email, 'X-User-Token': $rootScope.currentUser.user.token}
    var feed = $resource('https://unify-develop.herokuapp.com/api/v1/activities', {}, {
      get: {
        headers: headers
      }
    });
    return feed
  })

  .factory('Users', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }, {
      id: 5,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }, {
      id: 6,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }, {
      id: 7,
      name: 'Anna Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }, {
      id: 8,
      name: 'Adele Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }
    ];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });


