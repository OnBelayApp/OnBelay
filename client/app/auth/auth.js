angular.module('nova.auth', [])

.controller('AuthController', function ($scope, $rootScope, $window, $state, Auth, Notify) {
  $scope.user = {};
  $scope.hasAuth;
  $rootScope.unread = $rootScope.unread || 0;

  if (Auth.isAuth()) {
    $scope.hasAuth = true;
  } else {
    $scope.hasAuth = false;
  }

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.nova', token);
        $scope.hasAuth = true;
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
        $scope.hasAuth = true;
        $state.go('main');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.checkNotifications = function() {
    if (Auth.isAuth() && $state.name !== 'notifications') {
      Notify.checkNotifications();
    }
  };

  $scope.checkNotifications();
});
