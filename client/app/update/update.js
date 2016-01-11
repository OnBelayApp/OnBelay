angular.module('nova.update', [])

.controller('UpdateController', function($scope, $state, Update){
  $scope.user = { name: {first: '', last: ''} };
  $scope.update = function(){
    Update.update($scope.user)
    .then(function (res) {
        $state.go('main');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
