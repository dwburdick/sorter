/*
var booksRendered = document.getElementById('books');
var booksList = Sortable.create(booksRendered, {
	group: "choices",
	handle: ".handle",
});
var moviesRendered = document.getElementById('movies');
var moviesList = Sortable.create(moviesRendered, {
	group: "choices",
	handle: ".handle",
});
*/

var swSort = angular.module('swSort', ['ng-sortable']);

/* can replace controller with this to call json externally once online
swSort.controller('swSortCtrl', function ($scope, $http) {
	$http.get('js/stories.json').success(function(data) {
    	$scope.stories = data;
	})
});
*/

Model = {
	save: function() {
		myRanks = $("#ranks");
		saveList = myRanks.stringify();
	}
}

swSort.controller('swSortCtrl', function ($scope) {
	$scope.stories = [
		{
			title: "Episode I: The Phantom Menace",
			author: "George Lucas",
			year: 1999,
			type: "movie"
		},
		{
			title: "Episode II: Attack of the Clones",
			author: "George Lucas/Jonathan Hales",
			year: 2002,
			type: "movie"
		},
		{
			title: "Episode III: Revenge of the Sith",
			author: "George Lucas",
			year: 2005,
			type: "movie"
		},
		{
			title: "Episode IV: A New Hope",
			author: "George Lucas",
			year: 1977,
			type: "movie"
		},
		{
			title: "Episode V: The Empire Strikes Back",
			author: "Leigh Brackett/Lawrence Kasdan",
			year: 1980,
			type: "movie"
		},
		{
			title: "Episode VI: Return of the Jedi",
			author: "Lawrence Kasdan/George Lucas",
			year: 1983,
			type: "movie"
		},
		{
			title: "Tarkin",
			author: "James Luceno",
			year: 2014,
			type: "booksCanon"
		},
		{
			title: "Dark Disciple",
			author: "Christie Golden",
			year: 2015,
			type: "booksCanon"
		},
		{
			title: "Heir to the Jedi",
			author: "Kevin Hearne",
			year: 2015,
			type: "booksCanon"
		},
		{
			title: "Aftermath",
			author: "Chuck Wendig",
			year: 2015,
			type: "booksCanon"
		},
		{
			title: "Heir to the Empire (Thrawn 1)",
			author: "Timothy Zahn",
			year: 1991,
			type: "booksLegends"
		},
		{
			title: "Dark Force Rising (Thrawn 2)",
			author: "Timothy Zahn",
			year: 1992,
			type: "booksLegends"
		},
		{
			title: "The Last Command (Thrawn 3)",
			author: "Timothy Zahn",
			year: 1993,
			type: "booksLegends"
		},
		{
			title: "Star Wars",
			author: "Marvel",
			year: 2015,
			type: "comicsCanon"
		},
		{
			title: "Darth Vader",
			author: "Marvel",
			year: 2015,
			type: "comicsCanon"
		},
		{
			title: "Princess Leia",
			author: "Marvel",
			year: 2015,
			type: "comicsCanon"
		},
		{
			title: "Kanan the Last Padawan",
			author: "Marvel",
			year: 2015,
			type: "comicsCanon"
		},
		{
			title: "Lando",
			author: "Marvel",
			year: 2015,
			type: "comicsCanon"
		},
		{
			title: "Shattered Empire",
			author: "Marvel",
			year: 2015,
			type: "comicsCanon"
		},
		{
			title: "Chewbacca",
			author: "Marvel",
			year: 2015,
			type: "comicsCanon"
		},
		{
			title: "Vader Down",
			author: "Marvel",
			year: 2015,
			type: "comicsCanon"
		},
		{
			title: "The Clone Wars",
			author: "Dave Filoni",
			year: 2008,
			type: "tv"
		},
		{
			title: "Rebels",
			author: "Dave Filoni",
			year: 2014,
			type: "tv"
		}
	];
	$scope.mine = [];
	saveChoices = function() {
		console.log($scope.mine);
		var saveMine = angular.toJson($scope.mine);
		localStorage.setItem('myChoices', saveMine);
	};
	loadChoices = function() {
		$scope.$apply(function(){
			var loadMine = angular.fromJson(localStorage.myChoices);
			console.log(loadMine);
			$scope.mine = loadMine;
			console.log($scope.mine);
		});
	};
	clearChoices = function() {
		$scope.$apply(function(){
			$scope.mine = [];
		});
	};
});

$(document).ready(function(){
	$("#movieButton").click(function(){
		$("#options .movie").toggle();
	})
});
$(document).ready(function(){
	$("#booksCanonButton").click(function(){
		$("#options .booksCanon").toggle();
	})
});
$(document).ready(function(){
	$("#booksLegendsButton").click(function(){
		$("#options .booksLegends").toggle();
	})
});
$(document).ready(function(){
	$("#comicsCanonButton").click(function(){
		$("#options .comicsCanon").toggle();
	})
});
$(document).ready(function(){
	$("#tvButton").click(function(){
		$("#options .tv").toggle();
	})
});
