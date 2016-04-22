var Users = [];
var api = 'http://crscript.com/';
angular.module('starter.controllers', ['ionic', 'starter.services'])
    .controller('LoginCtrl', function($state, $scope, $stateParams, $ionicHistory, $http, $ionicLoading) {
        $ionicHistory.clearHistory();
        $scope.loginData = {};
        if (localStorage.getItem("tk")) {
            $state.go('app.users');
        }
        $scope.doLogin = function() {
            var data = $scope.loginData;
            if (!data.email || !data.password) {
                alert("Invalid Email or Password");
            } else {
                $http({
                    method: 'POST',
                    url: api + 'sessions',
                    data: {
                        email: data.email,
                        password: data.password
                    }
                }).then(function successCallback(response) {
                    localStorage.setItem("tk", response.data._ss);
                    localStorage.setItem("user", response.data.user);
                    $state.go('app.users');
                }, function errorCallback(response) {
                    alert("Invalid Email or Password");
                });
            }
        };
        $scope.doFacebookLogin = function($event) {
            $event.stopPropagation();
            $event.preventDefault();
        };
    })
    .controller('MenuCtrl', function($state, $scope, Camera) {
        $scope.photo = function() {
            var options = {
                allowEdit: false,
                quality: 100,
                cameraDirection: 1,
                saveToPhotoAlbum: true
            };
            Camera
                .getPicture(options)
                .then(function(imageData) {}, function(error) {});
        };
        $scope.logout = function() {
            $state.go('login');
        };
        $scope.users = function() {
            $state.go('app.users');
        };
    })
    .controller('UsersCtrl', function($scope, $http, $ionicLoading) {
        var page = 1;
        $scope.users = [];
        $scope.moreDataCanBeLoaded = true;
        $ionicLoading.show({
            noBackdrop: true,
        });
        $scope.loadMore = function() {
            $scope.getUsers(page + 1);
        }
        $scope.getUsers = function(page) {
            $http({
                method: 'GET',
                url: api + 'users?page=' + page
            }).then(function successCallback(response) {
                if (response.data.entries.length < 5) {
                    $scope.moreDataCanBeLoaded = false;
                }
                Users = Users.concat(response.data.entries);
                $scope.users = $scope.users.concat(response.data.entries);
                $ionicLoading.hide();
            }, function errorCallback(response) {
                $ionicLoading.hide();
            });
        };
        $scope.getUsers(1);
    })
    .controller('CodesCtrl', function($scope, $http, $ionicLoading) {
        $ionicLoading.show({
            noBackdrop: true,
        });
        $http
            .get(api + 'codes')
            .then(function(response) {
                $scope.codes = response.data.entries;
                $ionicLoading.hide();
            }, function(error) {
                $ionicLoading.hide();
            });
    })
    .controller('UserCtrl', function($scope, $stateParams, $cordovaGeolocation) {
        var userDetailled,
            userLocation,
            mapOptions,
            marker,
            userMap;
        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function(position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                myLatlng = new google.maps.LatLng(lat, long),
                    mapOptions = {
                        center: myLatlng,
                        zoom: 8,
                        timeout: 10000,
                        enableHighAccuracy: true,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    },
                    marker = new google.maps.Marker({
                        position: myLatlng,
                        title: userDetailled.name
                    });
                userMap = new google.maps.Map(document.getElementById('map-container'), mapOptions);

                marker.setMap(userMap);
            }, function(err) {
                alert("Activar el GPS.");
                // error
            });

        Users.map(function(user) {
            if (user._id == $stateParams.id) {
                userDetailled = user;
            }
        });
        $scope.user = userDetailled;
        $scope.map = userMap;
    });
