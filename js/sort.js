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
var ranksRendered = document.getElementById('ranks');
var ranksList = Sortable.create(ranksRendered, {
	group: "choices",
	ghostClass: ".ghostclass",
});

var model = {
	movies: [
		{
			title: "Episode I: The Phantom Menace",
			author: "George Lucas",
			year: 1999
		},
		{
			title: "Episode II: Attack of the Clones",
			author: "George Lucas/Jonathan Hales",
			year: 2002
		},
		{
			title: "Episode III: Revenge of the Sith",
			author: "George Lucas",
			year: 2005
		},
		{
			title: "Episode IV: A New Hope",
			author: "George Lucas",
			year: 1977
		},
		{
			title: "Episode V: The Empire Strikes Back",
			author: "Leigh Brackett/Lawrence Kasdan",
			year: 1980
		},
		{
			title: "Episode VI: Return of the Jedi",
			author: "Lawrence Kasdan/George Lucas",
			year: 1983
		},
	],
	canonBooks: [
		{
			title: "Tarkin",
			author: "James Luceno",
			year: 2014
		},
		{
			title: "Dark Disciple",
			author: "Christie Golden",
			year: 2015
		},
		{
			title: "Heir to the Jedi",
			author: "Kevin Hearne",
			year: 2015
		},
		{
			title: "Aftermath",
			author: "Chuck Wendig",
			year: 2015
		},
	],
	canonComics: [
		{
			title: "Star Wars",
			author: "Marvel",
			year: 2015
		},
		{
			title: "Darth Vader",
			author: "Marvel",
			year: 2015
		},
		{
			title: "Princess Leia",
			author: "Marvel",
			year: 2015
		},
		{
			title: "Kanan the Last Padawan",
			author: "Marvel",
			year: 2015
		},
		{
			title: "Lando",
			author: "Marvel",
			year: 2015
		},
		{
			title: "Shattered Empire",
			author: "Marvel",
			year: 2015
		},
		{
			title: "Chewbacca",
			author: "Marvel",
			year: 2015
		},
		{
			title: "Vader Down",
			author: "Marvel",
			year: 2015
		},
	],
	legends: [
		{
			title: "Heir to the Empire (Thrawn 1)",
			author: "Timothy Zahn",
			year: 1991
		},
		{
			title: "Dark Force Rising (Thrawn 2)",
			author: "Timothy Zahn",
			year: 1992
		},
		{
			title: "The Last Command (Thrawn 3)",
			author: "Timothy Zahn",
			year: 1993
		},
	],

}

var controller = {
	init: function() {
		view.init();
	}

}

var view = {
	init: function() {
		view.renderList("MOVIES", model.movies);
		view.renderList("NOVELS", model.canonBooks);
		view.renderList("COMICS", model.canonComics);
		view.renderList("LEGENDS", model.legends);
	},
	handle: "<span class='handle'>++</span>",
	renderList: function(id, list) {
		var listHTML = "<ul id=" + id + " class=" + id + ">" + id + "</ul>";
		var listID = "#" + id;
		$("body").append(listHTML);
		for (i in list) {
			var itemHTML = "<li class='item'><span class='handle'>" + view.handle + "</span> " + list[i].title + " by " + list[i].author + " (" + list[i].year + ") </li>";
			$(listID).append(itemHTML);
		};
		console.log(listID);
		debug = $(listID);
		var listRendered = document.getElementById(id);
		var listInit = Sortable.create(listRendered, {
			group: "choices",
			handle: ".handle",
		});
	},

}

controller.init();