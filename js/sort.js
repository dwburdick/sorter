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
	]
	legends: [
		{
			title: "Book 1",
			author: "John Doe",
			year: 1999
		},
		{
			title: "Book 2",
			author: "John Doe",
			year: 2000
		},
		{
			title: "Book 3",
			author: "John Doe",
			year: 2001
		},
	],

}

var controller = {

}

var view = {
	init: function() {
		view.renderList("MOVIES", model.movies);
		view.renderList("BOOKS", model.books);
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