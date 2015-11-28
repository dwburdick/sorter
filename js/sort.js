var swSort = angular.module('swSort', ['ng-sortable']);

var Model = {
	saveChoices: function() {
		var saveMine = angular.toJson(self.mine);
		localStorage.setItem('myChoices', saveMine);
	},
	loadChoices: function() {
		self.$apply(function(){
			var loadMine = angular.fromJson(localStorage.myChoices);
			self.mine = loadMine;
		});
	},
	clearChoices: function() {
		self.$apply(function(){
			self.mine = [];
		});
	}
}

swSort.controller('swSortCtrl', function ($scope) {
	$scope.stories = [
  {
    "id": 1,
    "title": "Episode I: The Phantom Menace",
    "author": "George Lucas",
    "year": 1999,
    "canon": "canon",
    "type": "film",
    "era": "prequel",
    "url": 0,
    "img": 0
  },
  {
    "id": 2,
    "title": "Episode II: Attack of the Clones",
    "author": "George Lucas/Jonathan Hales",
    "year": 2002,
    "canon": "canon",
    "type": "film",
    "era": "prequel",
    "url": 0,
    "img": 0
  },
  {
    "id": 3,
    "title": "Episode III: Revenge of the Sith",
    "author": "George Lucas",
    "year": 2005,
    "canon": "canon",
    "type": "film",
    "era": "prequel",
    "url": 0,
    "img": 0
  },
  {
    "id": 4,
    "title": "Episode IV: A New Hope",
    "author": "George Lucas",
    "year": 1977,
    "canon": "canon",
    "type": "film",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 5,
    "title": "Episode V: The Empire Strikes Back",
    "author": "Leigh Brackett/Lawrence Kasdan",
    "year": 1980,
    "canon": "canon",
    "type": "film",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 6,
    "title": "Episode VI: Return of the Jedi",
    "author": "Lawrence Kasdan/George Lucas",
    "year": 1983,
    "canon": "canon",
    "type": "film",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 7,
    "title": "Episode VII: The Force Awakens",
    "author": "Lawrence Kasdan/JJ Abrams/Michael Arndt",
    "year": 2015,
    "canon": "canon",
    "type": "film",
    "era": 0,
    "url": 0,
    "img": 0
  },
  {
    "id": 8,
    "title": "Episode VIII",
    "author": "Rian Johnson",
    "year": 2017,
    "canon": "canon",
    "type": "film",
    "era": 0,
    "url": 0,
    "img": 0
  },
  {
    "id": 9,
    "title": "Episode IX",
    "author": "...",
    "year": 2019,
    "canon": "canon",
    "type": "film",
    "era": 0,
    "url": 0,
    "img": 0
  },
  {
    "id": 10,
    "title": "Rogue One: A Star Wars Story",
    "author": "John Knoll/Chris Weitz/Gary Whitta",
    "year": 2016,
    "canon": "canon",
    "type": "film",
    "era": "prequel",
    "url": 0,
    "img": 0
  },
  {
    "id": 11,
    "title": "Untitled Han Solo film",
    "author": "Jon Kasdan/Lawrence Kasdan",
    "year": 2018,
    "canon": "canon",
    "type": "film",
    "era": 0,
    "url": 0,
    "img": 0
  },
  {
    "id": 12,
    "title": "Star Wars: From the Advetures of Luke Skywalker",
    "author": "George Lucas/Alan Dean Foster",
    "year": 1976,
    "canon": "canon",
    "type": "book",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 13,
    "title": "Splinter of the Mind's Eye",
    "author": "Alan Dean Foster",
    "year": 1978,
    "canon": "legends",
    "type": "book",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 14,
    "title": "Han Solo at Stars' End (Han 1)",
    "author": "Brian Daley",
    "year": 1979,
    "canon": "legends",
    "type": "book",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 15,
    "title": "Han Solo's Revenge (Han 2)",
    "author": "Brian Daley",
    "year": 1979,
    "canon": "legends",
    "type": "book",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 16,
    "title": "The Empire Strikes Back (novelization)",
    "author": "Donald F. Glut",
    "year": 1980,
    "canon": "canon",
    "type": "book",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 17,
    "title": "Han Solo and the Lost Legacy (Han 3)",
    "author": "Brian Daley",
    "year": 1980,
    "canon": "legends",
    "type": "book",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 18,
    "title": "Return of the Jedi (novelization)",
    "author": "James Kahn",
    "year": 1983,
    "canon": "canon",
    "type": "book",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 19,
    "title": "Lando Calrissian and the Mindharp of Sharu (Lando 1)",
    "author": "L. Neil Smith",
    "year": 1983,
    "canon": "legends",
    "type": "book",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 20,
    "title": "Lando Calrissian and the Flamewind of Oseon (Lando 2)",
    "author": "L. Neil Smith",
    "year": 1983,
    "canon": "legends",
    "type": "book",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 21,
    "title": "Lando Calrissian and the Starcave of ThonBoka (Lando 3)",
    "author": "L. Neil Smith",
    "year": 1983,
    "canon": "legends",
    "type": "book",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 22,
    "title": "Heir to the Empire (Thrawn 1)",
    "author": "Timothy Zahn",
    "year": 1991,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": 0,
    "img": 0
  },
  {
    "id": 23,
    "title": "Dark Force Rising (Thrawn 2)",
    "author": "Timothy Zahn",
    "year": 1992,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": 0,
    "img": 0
  },
  {
    "id": 24,
    "title": "The Glove of Darth Vader (Jedi Prince 1)",
    "author": "Paul and Hollace Davids",
    "year": 1992,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": 0,
    "img": 0
  },
  {
    "id": 25,
    "title": "The Lost City of the Jedi (Jedi Prince 2)",
    "author": "Paul and Hollace Davids",
    "year": 1992,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": 0,
    "img": 0
  },
  {
    "id": 26,
    "title": "Zorba the Hutt's Revenge (Jedi Prince 3)",
    "author": "Paul and Hollace Davids",
    "year": 1992,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": 0,
    "img": 0
  },
  {
    "id": 27,
    "title": "Mission From Mount Yoda (Jedi Prince 4)",
    "author": "Paul and Hollace Davids",
    "year": 1993,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": 0,
    "img": 0
  },
  {
    "id": 28,
    "title": "Queen of the Empire (Jedi Prince 5)",
    "author": "Paul and Hollace Davids",
    "year": 1993,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": 0,
    "img": 0
  },
  {
    "id": 29,
    "title": "Prophets of the Dark Side (Jedi Prince 6)",
    "author": "Paul and Hollace Davids",
    "year": 1993,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": 0,
    "img": 0
  },
  {
    "id": 30,
    "title": "The Last Command (Thrawn 3)",
    "author": "Timothy Zahn",
    "year": 1993,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": 0,
    "img": 0
  },
  {
    "id": 31,
    "title": "Tarkin",
    "author": "James Luceno",
    "year": 2014,
    "canon": "canon",
    "type": "book",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 32,
    "title": "Dark Disciple",
    "author": "Christie Golden",
    "year": 2015,
    "canon": "canon",
    "type": "book",
    "era": 0,
    "url": 0,
    "img": 0
  },
  {
    "id": 33,
    "title": "Heir to the Jedi",
    "author": "Kevin Hearne",
    "year": 2015,
    "canon": "canon",
    "type": "book",
    "era": "classic",
    "url": 0,
    "img": 0
  },
  {
    "id": 34,
    "title": "Aftermath",
    "author": "Chuck Wendig",
    "year": 2015,
    "canon": "canon",
    "type": "book",
    "era": "ABY",
    "url": 0,
    "img": 0
  }
];
	$scope.mine = [];
	self = $scope;
});

var View = {
	init: function() {
		$(".booksCanon").css('display', 'none');
		$(".booksLegends").css('display', 'none');
		$(".comicsCanon").css('display', 'none');
		$(".tv").css('display', 'none');
	}
}

$(document).ready(function(){
	$("#movieButton").click(function(){
		$("#options .movie").toggle();
	});
	$("#booksCanonButton").click(function(){
		$("#options .booksCanon").toggle();
	});
	$("#booksLegendsButton").click(function(){
		$("#options .booksLegends").toggle();
	});
	$("#comicsCanonButton").click(function(){
		$("#options .comicsCanon").toggle();
	});
	$("#tvButton").click(function(){
		$("#options .tv").toggle();
	});
	View.init();
});