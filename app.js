var app = angular.module('myApp', ['ngRoute']);

app.service('postService', function(){


  var initData = function() {
    var comments = [
           {
                "id": 1,
                "body": " This is comment 1.",
                "date": "2012-04-23T18:25:43.511Z",
                "location": "Merril",
                "tags": [
                    "#uncooldude",
                    "#notonmywatch"
                ]
            },
            {
                "id": 1,
                "body": " This is comment 2.",
                "date": "2012-04-24T18:25:43.511Z",
                "location": "Merril",
                "tags": [
                    "#uncooldude",
                    "#notonmywatch"
                ]
            }
      ];
      return comments;
  }

  var addPost = function(newPost){
    var retrievedObject = localStorage.getItem('testObject');
    var postList = JSON.parse(retrievedObject);
    if (postList == undefined) {
      postList = initData();
    }
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
    //localStorage.clear();
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
      var tags = [];

      $scope.submit = function(post){
          console.log("Post: ", post);
          date = new Date();
          correctDate = new Date();
          post.date = correctDate;
          post.tags = tags;
          postService.addPost(post);
      };

       $scope.addTag = function(tag) {
          console.log("You added a tag! ", tag);
          tags.push(tag);
        };
}]);
