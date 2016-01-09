angular.module('nova.main', [])

.controller('MainController', function($scope, Climbers, Notify){
    $scope.activeClimbers = [];

    $scope.getActiveClimbers = function(){
      Climbers.getClimbers()
        .then(function(res) {
          $scope.activeClimbers = res;
        })
        .catch(function(err) {
          console.error(err);
        });
    };

    $scope.climbOn = function(climber) {
      Notify.sendNotification(climber)
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.error(err);
        });
    };

});
