// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var projectUnify = angular.module('project_unify', ['ionic','ionic.service.core', 'ngCordova', 'yaru22.angular-timeago', 'ngMap', 'project_unify.controllers', 'project_unify.services', 'project_unify.directives', 'ionic.contrib.ui.tinderCards', 'ngResource', 'ui.gravatar'])
projectUnify.config(function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
  })

  .constant('API_URL', 'https://unify-develop.herokuapp.com/api/v1')

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    /*WELCOME*/
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'templates/welcome/intro.html',
        controller: 'LoginController'
      })

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.home', {
        url: '/home',
        views: {
          'home': {
            templateUrl: 'templates/home/home.html',
            controller: 'DemoCtrl'
          }
        }
      })

      .state('tab.post', {
        url: '/post/:id',
        views: {
          'home': {
            templateUrl: 'templates/home/post.html',
            controller: 'DemoCtrl'
          }
        }
      })

      .state('tab.me', {
        url: '/me',
        views: {
          'me': {
            templateUrl: 'templates/me/me.html',
            controller: 'DemoCtrl'
          }
        }
      })

      .state('tab.profile', {
        url: '/profile/',
        params: {
          user: {}
        },
        views: {
          'me': {
            templateUrl: 'templates/me/profile.html',
            controller: 'DemoCtrl'
          }
        }
      })

      .state('tab.settings', {
        url: '/settings',
        views: {
          'me': {
            templateUrl: 'templates/me/settings.html',
            controller: 'DemoCtrl'
          }
        }
      })

      .state('tab.messaging', {
        url: '/messaging',
        views: {
          'messaging': {
            templateUrl: 'templates/messaging/messaging.html',
            controller: 'MessageCtrl'
          }
        }
      })

      .state('tab.friends',{
        url: '/friends',
        views: {
          'friends': {
            templateUrl: 'templates/friends/friends.html',
            controller: 'FriendCtrl'
          }
        }
      })

      .state('chat', {
        url: '/chat/',
        views: {
          '': {
            templateUrl: 'templates/messaging/chat.html',
            controller: 'ChatCtrl'
          }
        },
        params: {
          conversation: {}
        }
      })

      .state('tab.network', {
        url: '/network',
        views: {
          'network': {
            templateUrl: 'templates/network/network.html',
            controller: 'DemoCtrl'
          }
        }
      })

      .state('tab.system', {
        url: '/system',
        views: {
          'system': {
            templateUrl: 'templates/system/system.html',
            controller: 'SystemCtrl'
          }
        }
      })

      .state('tab.search', {
        url: '/search',
        views: {
          'search': {
            templateUrl: 'templates/search/search.html',
            controller: 'DemoCtrl'
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/welcome');

  });

angular.module('ui.gravatar').config([
  'gravatarServiceProvider', function (gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      size: 100,
      "default": 'wavatar'  // Mystery man as default for missing avatars
    };

    // Use https endpoint
    gravatarServiceProvider.secure = true;

  }
]);

document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

  var notificationOpenedCallback = function(jsonData) {
    console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal.init("873dc99c-6398-4181-938f-036786442158",
    {googleProjectNumber: ""},
    notificationOpenedCallback);

  // Show an alert box if a notification comes in when the user is in your app.
  window.plugins.OneSignal.enableInAppAlertNotification(true);
}, false);

