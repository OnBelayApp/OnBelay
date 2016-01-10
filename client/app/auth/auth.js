angular.module('nova.auth', [])

.controller('AuthController', function ($scope, $window, $state, Auth, Notify) {
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

  $scope.unreadNotifications = 0;

  $scope.checkNotifications = function() {
    Notify.checkNotifications().then(function(resp) {
      $scope.hasNotifications = resp.data;
    });
  };

  $scope.checkNotifications();
});
