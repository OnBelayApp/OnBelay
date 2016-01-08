angular.module('nova', [
  'nova.auth',
  'nova.main',
  'nova.services',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider){
 // $urlRouterProvider.otherwise("/signin");
 
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
    })
    .state('update', {
      url: "/update",
      templateUrl: "app/auth/update.html",
      controller: "AuthController"
    })
 

})
