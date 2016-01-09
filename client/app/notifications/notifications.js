angular.module('nova.notifications', [])

  .controller('NotificationCtrl', function($scope, Notify) {
    $scope.notifications = [];

    $scope.getAllNotifications = function() {
      console.log('get all');
      Notify.fetchAllNotifications()
        .then(function(res) {
          $scope.notifications = res;
        })
        .catch(function(err) {
          console.error(err);
        });
    }();

    $scope.readAllNotifications = function() {
      console.log('running');
      Notify.markAllNotificationsRead()
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.error(err);
        });
    }();

    $scope.climbOn = function(climber) {
      Notify.replyToClimber(climber)
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.error(err);
        });
    };

  });
