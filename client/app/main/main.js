angular.module('nova.main', [])

.controller('MainController', function($scope, Climbers, Notify, Auth){
    $scope.activeClimbers = [];
    $scope.status = false;

    $scope.getActiveClimbers = function(){
      Climbers.getClimbers()
        .then(function(res) {
          $scope.activeClimbers = res;
        })
        .catch(function(err) {
          console.error(err);
        });
    }();

    $scope.getStatus = function() {
      Climbers.getStatus().then(function(res) {
        $scope.status = res.status;
      });
    }();

    $scope.updateStatus = function() {
      Climbers.updateStatus($scope.status).then(function(res) {
        console.log(res);
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
