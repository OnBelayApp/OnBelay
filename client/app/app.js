angular.module('nova', [
  'nova.auth',
  'nova.services',
  'ui.router'
])

.config(function($stateProvider, $urlRouteProvider, $httpProvider){
  $urlRouterProvider.otherwise("/main");
  $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: "app/main/main.html",
      controller: "MainController"
    })
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