'use strict';


angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    });


/**
 * Token Interceptor, Adding on header for future requests
 */
angular.module('starter').
factory('httpRequestInterceptor', ['$q', '$rootScope',
    function($q, $rootScope) {
        return {
            request: function(config) {
                var token = localStorage.getItem("tk");
                config.headers.Authorization = 'Bearer ' + token;
                return config;
            },
            responseError: function(response) {
                if (response.status === 401) {
                    localStorage.setItem("tk", "");
                    window.location = '/';
                }
                return $q.reject(response);
            }
        };
    }
]);

angular.module('starter')
    .config(['$httpProvider',
        function($httpProvider) {
            $httpProvider.interceptors.push('httpRequestInterceptor');
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
        }
    ]);
