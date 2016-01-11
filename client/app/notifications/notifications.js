angular.module('nova.notifications', [])

  .controller('NotificationCtrl', function($scope, Notify, Update) {
    $scope.notifications = [];

    $scope.getAllNotifications = function() {
      Notify.fetchAllNotifications()
        .then(function(res) {
          $scope.notifications = res;
        })
        .catch(function(err) {
          console.error(err);
        });
    }();

    $scope.readAllNotifications = function() {
      Notify.markAllNotificationsRead()
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.error(err);
        });
    }();

    $scope.climbOn = function(climber) {
      console.log('climber', climber);
      Notify.replyToClimber(climber)
        .then(function(res) {
          console.log(res);
        }).then(function() {
          Update.flagOff()
            .then(function(res) {
              console.log(res);
            })
            .catch(function(err) {
              console.error(err);
            });
        })
        .catch(function(err) {
          console.error(err);
        });
    };

  });
