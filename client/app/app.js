angular.module('nova', [
  'nova.auth',
  // 'nova.services',
//add 'ui.router' as a dependency
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider){
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
      templateUrl: "TODO/update.html",
      controller: "TODO"
    });

    // $httpProvider.interceptors.push('AttachTokens');
})

// .factory('AttachTokens', function($window){
//   var attach = {
//     request: function(object) {
//       var jwt = $window.localStorage.getItem('com.nova');
//       if (jwt) {
//         object.headers['x-access-token'] = jwt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// })

// .run(function($rootScope, $state, Auth) {
//   $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams){
//     if (toState.name === 'signin') {
      
//     }
//   });
// });