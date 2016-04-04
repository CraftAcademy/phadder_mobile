angular.module('project_unify.services', [])


  .factory('signUpService', function ($resource, API_URL) {
    return $resource(API_URL + '/users', {}, {
      save: {
        method: "POST",
        headers: {HTTP_ACCEPT: 'application/json'}
      }
    });
  })

  .factory('loginService', function ($resource, API_URL) {
    return $resource(API_URL + '/users/sign_in');
  })

  .factory('oauthService', function ($resource, API_URL) {
    return $resource(API_URL + '/users/auth/:provider');
  })

  .factory('unifyService', function ($rootScope, $resource, API_URL) {
    var unify = $resource(API_URL + '/unify/:id', {}, {
      get: {
        method: 'GET',
        headers: {'X-User-Email': $rootScope.currentUser.user.email, 'X-User-Token': $rootScope.currentUser.user.token}
      }
    });

    return unify;
  })

  .factory('skillsService', function ($rootScope, $resource, API_URL) {
    var skills = $resource(API_URL + '/skills/:id', {}, {
      save: {
        method: 'POST',
        headers: {'X-User-Email': $rootScope.currentUser.user.email, 'X-User-Token': $rootScope.currentUser.user.token}
      }
    });

    return skills;
  })

  .factory('messageService', function ($resource, $rootScope, $http, API_URL) {
    var apiBase = API_URL + '/mailbox';
    var headers = {
      'X-User-Email': $rootScope.currentUser.user.email,
      'X-User-Token': $rootScope.currentUser.user.token,
      HTTP_ACCEPT: 'application/json'
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
      updateMessageStatus: function (data, callback) {
        $http.post(apiBase + '/conversations/update', data, {headers: headers}).success(callback);
      },
      messageCount: function (callback) {
        $http.get(apiBase + '/conversations/messages_count', {headers: headers}).success(callback);
      }
    }
  })

  .factory('userService', function ($rootScope, $resource, API_URL) {
    var headers = {'X-User-Email': $rootScope.currentUser.user.email, 'X-User-Token': $rootScope.currentUser.user.token}
    var user = $resource(API_URL + '/users/:id', {}, {
      get: {
        headers: headers
      }
    });
    return user;
  })


  .factory('feedService', function ($rootScope, $resource, API_URL) {
    var headers = {'X-User-Email': $rootScope.currentUser.user.email, 'X-User-Token': $rootScope.currentUser.user.token}
    var feed = $resource(API_URL + '/activities', {}, {
      get: {
        headers: headers
      }
    });
    return feed
  })

  .factory('friendshipService', function ($rootScope, $resource, API_URL) {
    var headers = {'X-User-Email': $rootScope.currentUser.user.email, 'X-User-Token': $rootScope.currentUser.user.token}
    var friendship = $resource(API_URL + '/user/' + $rootScope.currentUser.user.id + '/friendship/:friend_id ', {}, {
      get: {
        headers: headers
      }
    });
    return friendship
  });


