var app = angular.module('myApp', ['ngRoute']);

app.service('postService', function(){




  var addPost = function(newPost){
    var postList = [ {'body': 'sdsa', 'date' : '2014-04-25'}, {'body': 'sdsa2', 'date' : '2014-01-25'}  ];
    localStorage.setItem('testObject', JSON.stringify(postList));
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
      var retrievedObject = localStorage.getItem('testObject');
      $scope.posts = JSON.parse(retrievedObject);
      //console.log('retrievedObject : ', JSON.parse(retrievedObject) );

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