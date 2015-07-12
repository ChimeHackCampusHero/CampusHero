var app = angular.module('myApp', ['chart.js']);


app.service('postService', function(){

  var initData = function() {
    var comments = [
           {
                "id": 1,
                "body": "I was at a party on Saturday night. Some dude couldn't keep his hands to himself.",
                "date": 1436672771000,
                "location": "Merill",
                "tags": [
                    "#UnCoolDude",
                    "#Creepy"
                ]
            },
            {
                "id": 2,
                "body": "Saw a guy leaving a party with a drunk freshman. I made sure she got home ok.",
                "date": 1436672521382,
                "location": "Dakin",
                "tags": [
                    "#UnCoolDude",
                    "#NotOnMyWatch"
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
	$scope.page = 'blog';
	$scope.goStats = function(){
		$scope.page = "stats";
	};
	$scope.goBlog = function(){
		$scope.page = "blog";
	};
	$scope.goMap = function(){
		$scope.page = "map";
	};
    // $location.path( "/about" );
    $scope.about = "about.html";
    $scope.blog = "blog.html";
    $scope.submitForm = "form.html";
    $scope.stats = "stats.html";
    $scope.map = "map.html"
}]);

app.controller('AboutCtrl', ['$scope', function($scope) {

}]);

app.controller('BlogCtrl', ['$scope', 'postService', function($scope, postService) {

  // Contains the filter options
  $scope.locationOptions =  ["All", "Dakin", "Enfield", "Merill", "Prescott"];

  $scope.selectedLocation = "All";

    // Custom filter for sorting by location
    $scope.customFilter = function(post, getLocation) {
      if (post.location === $scope.selectedLocation) {
        return true;
      } else if ($scope.selectedLocation === "All") {
        return true;
      } else {
        return false;
      }
    };

    var retrievedObject = localStorage.getItem('testObject');
    $scope.posts = JSON.parse(retrievedObject);
    for(var obj in $scope.posts){
      if($scope.posts[obj].location != undefined){
        getLocation($scope.posts[obj].location);  
      }
      
    };
}]);

app.controller('StatsCtrl', ['$scope', function($scope){

	  // $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	  // $scope.series = ['Series A', 'Series B'];

	  // $scope.data = [
	  //   [65, 59, 80, 81, 56, 55, 40],
	  //   [28, 48, 40, 19, 86, 27, 90]
	  // ];



}]);
app.controller("BarCtrl", function ($scope) {
  $scope.labels = ['4/1', '4/2', '4/3', '4/4', '4/5', '4/6', '4/7','4/8', '4/9', '4/10', '4/11', '4/12', '4/13', '4/14','4/15', '4/16', '4/17', '4/18', '4/19', '4/20', '4/21','4/22', '4/23', '4/24', '4/25', '4/26', '4/27', '4/28', '4/29', '4/30'];
  $scope.series = ['#thankYouKindStranger', '#unCoolDude'];

  $scope.data = [
    [20, 15, 30, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 12, 30],
    [13, 12, 25, 32, 15, 55, 40, 7, 12, 2, 9, 33, 55, 40, 12, 3, 12, 21, 29, 30, 40, 3, 8, 20, 13, 20, 30, 40, 12, 15]
  ];
});

app.controller("DoughnutCtrl", function ($scope) {

   	$scope.labels = ["Dakin", "Enfield", "Prescott", "Greenwich", "Merrill"];
  	$scope.data = [70, 12, 35, 22, 30];

});

app.controller('FormCtrl', ['$scope', 'postService', function($scope, postService) {
      var tags = [];

      $scope.locations = ["Merill", "Dakin", "Prescott", "Enfield"];

      $scope.submit = function(post){
          post.date = new Date().getTime();
          post.tags = tags;
          postService.addPost(post);
      };

       $scope.addTag = function(tag) {
          tags.push(tag);
	      document.postForm.comment.value += tag;
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




