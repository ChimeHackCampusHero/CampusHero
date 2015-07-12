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
      for (post in $scope.posts){
        console.log(JSON.stringify($scope.posts));
        getLocation(post.location);
      }
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
          correctDate = date.toString('dddd, MMMM ,yyyy'); 
          post.date = correctDate;
          post.tags = tags;
          postService.addPost(post);
      };

       $scope.addTag = function(tag) {
          console.log("You added a tag! ", tag);
          tags.push(tag);
        };
}]);

//MAPPING STUFF

var college = new google.maps.LatLng(42.324365,-72.5321567);
var prescott = new google.maps.LatLng(42.3235537,-72.5342356);
var merill = new google.maps.LatLng(42.3235539,-72.5342356);
var dakin = new google.maps.LatLng(42.3235535,-72.5342356);
var enfield = new google.maps.LatLng(42.3235537,-72.5342359);
var marker;
var map;
var google;
var mapOptions = {
    zoom: 16,
    center: college
};
var getLocation = function(loc){
  var prescott = new google.maps.LatLng(42.3235537,-72.5342356);
  var merill = new google.maps.LatLng(42.3235539,-72.5342356);
  var dakin = new google.maps.LatLng(42.3235535,-72.5342356);
  var enfield = new google.maps.LatLng(42.3235537,-72.5342359);
  console.log(loc);
    if(loc == "Merril"){
      addMarker(merill);
    }else if(loc == "Prescott"){
      addMarker(prescott);
    } else if(loc == "Dakin"){
      addMarker(dakin);
    } else if(loc == "Enfield"){
      addMarker(enfield);
    }
};
var addMarker = function(location){
  marker = new google.maps.Marker({
    map:map,
    draggable:false,
    animation: google.maps.Animation.DROP,
    position: location
  });
};
google.init = function initialize() {

  map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);


};

google.bounce = function toggleBounce() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
};
//load the maps
google.maps.event.addDomListener(window, 'load', google.init);





// The following example creates a marker in Stockholm, Sweden
// using a DROP animation. Clicking on the marker will toggle
// the animation between a BOUNCE animation and no animation.




