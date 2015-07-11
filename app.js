var app = angular.module('myApp', ['ngRoute']);

app.service('postService', function(){
  var postList = [
        {'body':'sdsa',
      'date': '2014-21-21'},

        {'body':'asdas',
          'date': '2014-21-21'}];

  var addPost = function(newPost){
    postList.push(newPost);
  };

  var getPosts = function(){
    return postList;  
  };

  return{
    addPost: addPost,
    getPosts: getPosts
  }

});

app.controller('MainCtrl', ['$scope', "$location", function($scope, $location) {

    // $location.path( "/about" );
    $scope.about = "about.html";
    $scope.blog = "blog.html";
    $scope.submitForm = "form.html"

}]);
app.controller('AboutCtrl', ['$scope', function($scope) {

}]);

app.controller('BlogCtrl', ['$scope', 'postService', function($scope, postService) {
      $scope.posts = postService.getPosts();
      // [{
      //   post: [{
      //     body: "Some text"
      //   }]
      // }];
}]);



app.controller('FormCtrl', ['$scope', function($scope, postService) {
	 $scope.master = {};
   $scope.posts = [];
   //$scope.postText = 'CampusHero';
   $scope.post = {};
      //$scope.update = function(user) {
        //$scope.master = angular.copy(user);
      //};

      $scope.submit = function(posts){
        
          $scope.posts.push(this.post);
        //  $scope.postText = ""; 
        
      };

      //$scope.reset = function() {
     //   $scope.user = angular.copy($scope.master);
      //};

      //$scope.reset();

}]);