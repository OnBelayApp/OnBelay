angular.module('nova.auth', [])

.controller('AuthController', function ($scope, $window, $state, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.nova', token);
        $state.go('main');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.nova', token);
        $state.go('main');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.update = function(){
    Auth.update($scope.user)
    .then(function (token) {
        $state.go('main');
      })
      .catch(function (error) {
        console.error(error);
      });
  };


});
