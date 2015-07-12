var app = angular.module('myApp', ['ngRoute']);

app.service('postService', function(){




  var addPost = function(newPost){
    var retrievedObject = localStorage.getItem('testObject');
    var postList = JSON.parse(retrievedObject);
    postList.push(newPost);
    localStorage.setItem('testObject', JSON.stringify(postList));
    location.reload();
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
	console.log("FOO");
	$scope.page = 'blog';
	$scope.goStats = function(){
		$scope.page = "stats";
	};
	$scope.goBlog = function(){
		$scope.page = "blog";
	};
    // $location.path( "/about" );
    $scope.about = "about.html";
    $scope.blog = "blog.html";
    $scope.submitForm = "form.html";
    $scope.stats = "stats.html";
}]);

app.controller('AboutCtrl', ['$scope', function($scope) {

}]);

app.controller('BlogCtrl', ['$scope', 'postService', function($scope, postService) {

      var retrievedObject = localStorage.getItem('testObject');
      $scope.posts = JSON.parse(retrievedObject);
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
