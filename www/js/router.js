'use strict';

angular.module('starter')
    .config(function($stateProvider, $urlRouterProvider) {
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
            .state('app.codes', {
                url: '/codes',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/codes.html',
                        controller: 'CodesCtrl'
                    }
                }
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
            .state('app.articles', {
                url: '/code/:code_id/articles',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/articles.html',
                        controller: 'ArticlesCtrl',
                        controllerAs: 'vm'
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
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
        //$urlRouterProvider.otherwise('/app/users');
    });
