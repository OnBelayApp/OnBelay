angular.module('nova.update', [])

.controller('UpdateController', function($scope, $state, Update){
  $scope.user = {};
  $scope.update = function(){
    Update.update($scope.user)
    .then(function (token) {
        $state.go('main');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});