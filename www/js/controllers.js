angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($state, $scope, $stateParams) {
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
})
.controller('MenuCtrl', function ($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  // $scope.loginData = {};

  // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };

  // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

  // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);

  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };

  $scope.logout = function () {
    // $scope.modal.show();
    alert("logout");
  };
})
.controller('UsersCtrl', function ($scope, $http) {
  $http
  .get('http://utn.herokuapp.com/api/users')
  .then(function (response) {
    $scope.users = response.data;
  }, function (error) { });
})
.controller('UserCtrl', function ($scope, $stateParams) {
    // $scope.responses = [
    //   { title: 'api response 1', id: 1 },
    //   { title: 'api response 2', id: 2 },
    //   { title: 'api response 3', id: 3 },
    //   { title: 'api response 4', id: 4 },
    //   { title: 'api response 5', id: 5 },
    //   { title: 'api response 6', id: 6 }
    // ];
});

