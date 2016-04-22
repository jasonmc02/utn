angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])
.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    abstract: false,
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })
  .state('app.users', {
    url: '/users',
    views: {
      'menuContent': {
        templateUrl: 'templates/users.html',
        controller: 'UsersCtrl'
      }
    }
  })
  .state('app.user', {
    url: '/user/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/user.html',
        controller: 'UserCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/login');
});
