var Users = [];
angular.module('starter.controllers', ['ionic', 'starter.services'])
.controller('LoginCtrl', function ($state, $scope, $stateParams, $ionicHistory) {
  $ionicHistory.clearHistory();
  $scope.loginData = {};
  $scope.doLogin = function () {
    var data = $scope.loginData,
        re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!data.email || !data.password || !re.test(data.email)) {
      alert("Invalid Email or Password");
    } else {
      $state.go('app.users');
    }
  };
  $scope.doFacebookLogin = function ($event) {
    $event.stopPropagation();
    $event.preventDefault();
  };
})
.controller('MenuCtrl', function ($state, $scope, Camera) {
  $scope.photo = function () {
    var options = {
      allowEdit: false,
      quality: 100,
      cameraDirection: 1,
      saveToPhotoAlbum: true
    };
    Camera
    .getPicture(options)
    .then(function (imageData) {
    }, function (error) {
    });
  };
  $scope.logout = function () {
    $state.go('login');
  };
})
.controller('UsersCtrl', function ($scope, $http, $ionicLoading) {
  $ionicLoading.show({
    noBackdrop: true,
  });
  $http
  .get('http://utn.herokuapp.com/api/users')
  .then(function (response) {
    Users = response.data;
    $scope.users = Users;
    $ionicLoading.hide();
  }, function (error) {
    $ionicLoading.hide();
  });
})
.controller('UserCtrl', function ($scope, $stateParams, $cordovaGeolocation) {
  var userDetailled,
      userLocation,
      mapOptions,
      marker,
      userMap;

  Users.map(function(user) {
    if (user._id == $stateParams.id) {
      userDetailled = user;
    }
  });
  myLatlng = new google.maps.LatLng(-34.397, 150.644),
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
  $scope.user = userDetailled;
  $scope.map = userMap;
});

