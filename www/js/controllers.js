var Users = [];
angular.module('starter.controllers', ['ionic', 'starter.services'])
.controller('LoginCtrl', function ($state, $scope, $stateParams, $ionicHistory, $http, $ionicLoading) {
  $ionicHistory.clearHistory();
  $scope.loginData = {};
  $scope.doLogin = function () {
    var data = $scope.loginData,
        re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!data.email || !data.password || !re.test(data.email)) {
      alert('Invalid Email or Password');
    } else {
      $ionicLoading.show({
        noBackdrop: true,
      });
      $http
      .post('http://www.crscript.com/sessions', {
        email: data.email,
        password: data.password
      })
      .then(function (response) {
        $state.go('app.users');
      }, function (error) {
        $ionicLoading.hide();
        alert('Something went wrong');
      });
    }
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
.controller('UsersCtrl', function ($scope, $http, $ionicLoading, $ionicHistory) {
  $ionicHistory.clearHistory();
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
.controller('UserCtrl', function ($scope, $stateParams, $ionicLoading, $cordovaGeolocation) {
  $ionicLoading.show({
    noBackdrop: true,
  });
  var userDetailled,
      userLocation,
      posOptions,
      myLatlng,
      mapOptions,
      marker,
      userMap,
      lat,
      long;
  Users.map(function (user) {
    if (user._id == $stateParams.id) {
      userDetailled = user;
    }
  });
  posOptions = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation
  .getCurrentPosition(posOptions)
  .then(function (position) {
    lat  = position.coords.latitude;
    long = position.coords.longitude;
    myLatlng = new google.maps.LatLng(lat, long),
    mapOptions = { 
      center: myLatlng,
      zoom: 15,
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
    $scope.map = userMap;
  }, function (err) {
    alert("Something went wrong");
  })
  .finally(function () {
    $scope.user = userDetailled;
    $ionicLoading.hide();
  });
});

