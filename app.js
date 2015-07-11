angular.module('myApp', ['ngRoute'])

.controller('MainCtrl', ['$scope', "$location", function($scope, $location) {
$scope.url = "about.html";
$scope.title = "About";
  $scope.partials =
  	[ { name: 'projects.html', url: 'projects.html'},
      { name: 'contact.html', url: 'contact.html'} ];
  $scope.partial = $scope.partials[0];
 $scope.about = function(){
    $scope.title = "About";
    // $location.path( "/about" );
    $scope.url = "about.html";
  }
}]);