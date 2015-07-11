var app = angular.module('myApp', ['ngRoute']);

app.service('postService', function(){
  var postList = [];



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
    $scope.submitForm = "form.html";

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



app.controller('FormCtrl', ['$scope', 'postService', function($scope, postService) {

      $scope.submit = function(post){
          date = new Date();
          correctDate = date.toString('dddd, MMMM ,yyyy'); 
          post.date = correctDate;
          postService.addPost(post);
      };


}]);