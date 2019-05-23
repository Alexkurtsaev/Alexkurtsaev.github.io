var config = {
    apiKey: "AIzaSyD5cnjDaNmFQianwCjuMD1RXROgu_3JMC4",
    authDomain: "reservation-site-74787.firebaseapp.com",
    databaseURL: "https://reservation-site-74787.firebaseio.com",
    projectId: "reservation-site-74787",
    storageBucket: "reservation-site-74787.appspot.com",
    messagingSenderId: "816279343557",
    appId: "1:816279343557:web:baf6e5b691fd2760"
  };
firebase.initializeApp(config);
var database = firebase.database();

var reservationData = {};
var reviewData = {};

$(".reservationForm").on("submit", function(e){
	e.preventDefault();
	reservationData.name = $("#resName").val();
	reservationData.date = $("#resDate").val();
	var reservationReference = database.ref("reservations");
  	reservationReference.push(reservationData);
});

$(".reviewForm").on("submit", function(e){
	e.preventDefault();
	reviewData.name = $("#revName").val();
	reviewData.item = $("#revItem").val();
	reviewData.review = $("#revReview").val();
	var reviewReference = database.ref("reviews");
  	reviewReference.push(reviewData);
});

function getReservations(){
	database.ref("reservations").on("value", function(results){
    	var allReservations = results.val();
      	for (var reservation in allReservations){
        	var context = {
            	name : allReservations[reservation].name,
              	date: allReservations[reservation].date,
              	reservationId: reservation
            };
            var source = $("#reservationTable").html();
          	var template = Handlebars.compile(source);
          	var reservationTableItem = template(context);
          	$(".resTable").append(reservationTableItem);
        }
    });
}

function getReviews(){
	database.ref("reviews").on("value", function(results){
    	var allReviews = results.val();
    	$(".reviewList").empty();
      	for (var review in allReviews){
        	var context = {
            	name : allReviews[review].name,
              	item: allReviews[review].item,
              	review: allReviews[review].review,
              	reviewId: review
            };
            var source = $("#reviewDisplay").html();
          	var template = Handlebars.compile(source);
          	var reviewListItem = template(context);
          	$(".reviewList").append(reviewListItem);
        }
    });
}

var restaurantLocation ={
	lat: 40.8054491,
	lng: -73.9654415
};
function initMap(){
	var map = new google.maps.Map(document.getElementById("map"), {
      		center: restaurantLocation,
      		zoom: 14,
      		scrollwheel: false
    	});
	var marker = new google.maps.Marker({
        	position: restaurantLocation,
          	map: map,
          	title: "Restaurant Location"
        });
}

getReviews();
getReservations();
initMap();