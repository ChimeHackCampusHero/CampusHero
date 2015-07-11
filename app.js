angular.module('myApp', ['ngRoute'])

.controller('MainCtrl', ['$scope', "$location", function($scope, $location) {

    // $location.path( "/about" );
    $scope.about = "about.html";
    $scope.blog = "blog.html";
    $scope.submitForm = "form.html"

}])
.controller('AboutCtrl', ['$scope', function($scope) {

}])
.controller('BlogCtrl', ['$scope', function($scope) {

}])
.controller('FormCtrl', ['$scope', function($scope) {
	 $scope.master = {};

      $scope.update = function(user) {
        $scope.master = angular.copy(user);
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();

}])