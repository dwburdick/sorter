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
});
