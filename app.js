var app = angular.module('myApp', ['ngRoute']);




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
	console.log("FOO");
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

      var retrievedObject = localStorage.getItem('testObject');
      $scope.posts = JSON.parse(retrievedObject);
      for (post in $scope.posts){
        console.log(JSON.stringify($scope.posts));
        getLocation(post.location);
      }
}]);

app.controller('StatsCtrl', ['$scope', function($scope){

// 	var myBarChart = new Chart(ctx).Bar(data, options);

// 	var data = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//         {
//             label: "My First dataset",
//             fillColor: "rgba(220,220,220,0.5)",
//             strokeColor: "rgba(220,220,220,0.8)",
//             highlightFill: "rgba(220,220,220,0.75)",
//             highlightStroke: "rgba(220,220,220,1)",
//             data: [65, 59, 80, 81, 56, 55, 40]
//         },
//         {
//             label: "My Second dataset",
//             fillColor: "rgba(151,187,205,0.5)",
//             strokeColor: "rgba(151,187,205,0.8)",
//             highlightFill: "rgba(151,187,205,0.75)",
//             highlightStroke: "rgba(151,187,205,1)",
//             data: [28, 48, 40, 19, 86, 27, 90]
//         }
//     ]
// };


}]);

app.controller('FormCtrl', ['$scope', 'postService', function($scope, postService) {
      var tags = [];

      $scope.locations = ["Merill", "Dakin", "Prescott", "Enfield"];

      $scope.submit = function(post){
          console.log("Post: ", post);
          date = new Date();

          correctDate = new Date().getTime();
          post.date = correctDate;
          post.tags = tags;
          postService.addPost(post);
      };

       $scope.addTag = function(tag) {
          console.log("You added a tag! ", tag);
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




