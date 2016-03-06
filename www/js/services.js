angular.module('project_unify.services', [])


  .factory('signUpService', function ($resource) {
    return $resource('https://unify-develop.herokuapp.com/api/v1/users', {},{
      save:{
        method:"POST",
        headers:{HTTP_ACCEPT: 'application/json'}
      }
    });
  })

  .factory('loginService', function ($resource) {
    return $resource('https://unify-develop.herokuapp.com/api/v1/users/sign_in');
  })

  .factory('facebookService', function ($resource) {
    return $resource('https://unify-develop.herokuapp.com/api/v1/users/auth/facebook');
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


