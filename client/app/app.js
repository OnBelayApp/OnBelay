angular.module('nova', [
  'nova.auth',
  'nova.services',
  'ui.router'
])

.config(function($stateProvider, $urlRouteProvider, $httpProvider){
  $urlRouterProvider.otherwise("/main");
  $stateProvider
    // .state('main', {
    //   url: "/main",
    //   templateUrl: "app/main/main.html",
    //   controller: "MainController"
    // })
    .state('signin', {
      url: "/signin",
      templateUrl: "app/auth/signin.html",
      controller: "AuthController"
    })
    .state('signup', {
      url: "/signup",
      templateUrl: "app/auth/signup.html",
      controller: "AuthController"
    });

    $httpProvider.interceptors.push('AttachTokens');
})

.factory('AttachTokens', function($window){
  var attach = {
    request: function(object) {
      var jwt = $window.localStorage.getItem('com.nova');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

.run(function($rootScope, $state, Auth) {
  $rootScope.$on('$stateChangeStart', function(evt, next, current){
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});