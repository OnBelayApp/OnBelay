angular.module('nova.main', [])

.controller('MainController', function($scope, Climbers){
    $scope.activeClimbers = [];
    $scope.getActiveClimbers = function(){
      Climbers.getClimbers()
        .then(function(res) {
          $scope.activeClimbers = res.data;
        }, function(err) {
          console.log(err);
        });
    };
});