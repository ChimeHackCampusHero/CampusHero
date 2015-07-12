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
                "body": "Saw a guy trying to leave a party with a drunk freshman. My friends and I made sure she got home safely.",
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
    $scope.showMain = true;
    $scope.showMap = false;
    $scope.showStats = false;

    //localStorage.clear();
	$scope.page = 'blog';
	$scope.goStats = function(){
		//$scope.page = "stats";
		$scope.showMain = false;
        $scope.showMap = false;
        $scope.showStats = true;

	};
	$scope.goBlog = function(){
		//$scope.page = "blog";
		$scope.showMain = true;
            $scope.showMap = false;
            $scope.showStats = false;
	};
	$scope.goMap = function(){
		//$scope.page = "map";
		$scope.showMain = false;
        $scope.showMap = true;

        $scope.showStats = false;
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

  // Contains the location options
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

   /*
      // Contains the tag options
      $scope.locationOptions =
      [ "All", "#ThankYouKindStranger", "#Consent", "#YesMeansYes", "#OnlyWhenIWantIt", "#NotOnMyWatch", "#SexualAssault", "#UnCoolDude", "#Creepy", "#PartyCulture" ];

      $scope.selectedLocation = "All";

        // Custom filter for sorting by location
        $scope.customFilter = function(post) {
          if (post.tags.indexOf($scope.selectedTag) != -1) {
            return false;
          } else {
            return true;
          }
        };
    */

    var retrievedObject = localStorage.getItem('testObject');
    $scope.posts = JSON.parse(retrievedObject);
    for(var obj in $scope.posts){
      //var tags;
      // if ($scope.posts[obj].location != undefined){
      //   for(var tag in $scope.posts[obj].tags)
      //     tags = tags + $scope.posts[obj].tags[tag];
        
      if($scope.posts[obj].location != undefined){
        getLocation($scope.posts[obj].location, $scope.posts[obj].body); //, $scope.posts[obj].body, addMarker  
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
  $scope.legend = true;
  $scope.labels = ['September', 'October', 'November', 'December'];
  $scope.series = ['#ThankYouKindStranger', '#UnCoolDude'];
  $scope.data = [
    [20, 15, 30, 40],
    [13, 12, 25, 32] ];
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
// var prescott = new google.maps.LatLng(42.3235537,-72.5342356);
// var merill = new google.maps.LatLng(42.3235539,-72.5342356);
// var dakin = new google.maps.LatLng(42.3235535,-72.5342356);
// var enfield = new google.maps.LatLng(42.3235537,-72.5342359);
var marker;
var map;
var google;
var mapOptions = {
    zoom: 16,
    center: college
};
var getLocation = function(location, body){ //, body, addMarker
  var prescott = new google.maps.LatLng(42.323456, -72.533763);
  var merill = new google.maps.LatLng(42.323488, -72.529933);
  var dakin = new google.maps.LatLng(42.322782, -72.530330);
  var enfield = new google.maps.LatLng(42.325520, -72.531873);
   //console.log(loc);
    if(location == "Merril"){
      addMarker(merill, body);
    }else if(location == "Prescott"){
      addMarker(prescott, body);
    } else if(location == "Dakin"){
      addMarker(dakin, body);
    } else if(location == "Enfield"){
      addMarker(enfield, body);
    }
};


var addMarker = function(location, body){ // body
  var marker = new google.maps.Marker({
    map:map,
    draggable:false,
    animation: google.maps.Animation.DROP,
    position: location,
  });
  console.log(body);
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading"></h1>'+
      '<div id="bodyContent">'+
      '<p>'+ body+'</p>'+
      '</div>'+
      '</div>'; 
  var infoWindow = new google.maps.InfoWindow({
    content: contentString
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map,marker);
  });
    marker.setMap(map);
    // addInfo(marker);
};
//   var contentString = '<div id="content">'+
//       '<div id="siteNotice">'+
//       '</div>'+
//       '<h1 id="firstHeading" class="firstHeading"></h1>'+
//       '<div id="bodyContent">'+
//       '<p>'+"ASD"+'</p>'+
//       '<p>'+'</p>'+
//       '</div>'+
//       '</div>';
// function addInfo(marker){

//   var infoWindow = new google.maps.infoWindow({
//     content: contentString
//   });

//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.open(map,marker);
//   });
// };

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




