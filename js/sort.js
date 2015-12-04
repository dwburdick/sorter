var swSort = angular.module('swSort', ['ng-sortable']);

// thank you, @nickforthought https://scotch.io/quick-tips/how-to-encode-and-decode-strings-with-base64-in-javascript
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

var Model = {
    saveChoices: function() {
        var saveIDs = [];
        for (var i = 0, len = self.mine.length; i < len; i++) {
            saveIDs.push(self.mine[i].id);
        }
        var saveStr = JSON.stringify(saveIDs);
        var urlStr = Base64.encode(saveStr);
        newUrl = "http://nicetryinternet.com/star-wars-ranker/index.htm?" + urlStr;
        $("#shareUrl").text(newUrl);
        $("meta[property='og\\:url']").attr("content", newUrl);
    },
    loadChoices: function() {
        var url = window.location.href;
        if (url.indexOf('?') === -1) {
            return;
        } else {
            var loadUrl = url.slice(window.location.href.indexOf('?') + 1).split();
            var decodeUrl = loadUrl.toString();
            var loadStr = Base64.decode(decodeUrl);
            var loadIDs = JSON.parse(loadStr);
            var loadArray = [];
            for (var i = 0, len = loadIDs.length; i < len; i++) {
                for (var f = 0, fen = self.stories.length; f < fen; f++) {
                    if (loadIDs[i] === self.stories[f].id) {
                        loadArray.push(self.stories[f]);
                    }
                }
            }
        }
        self.$apply(function(){
            self.mine = loadArray;
        });
    },
    clearChoices: function() {
        self.$apply(function(){
            self.mine = [];
        });
    },
    addSingle: function(id) {
        var toAdd = self.stories[id];
        self.$apply(function(){
            self.mine[self.mine.length] = toAdd;
        });
    }
};

angular.module('swSort', ['ng-sortable'])
.controller('swSortCtrl', ['$scope', function ($scope) {
    $scope.storiesConfig = {
        ghostClass: "ghostclass",
    };
    $scope.addSingle = function(id) {
        var toAdd;
        for (var i = 0, len = self.stories.length; i < len; i++) {
            if (self.stories[i].id === id) {
                toAdd = self.stories[i];
            }
        }
        self.mine[self.mine.length] = toAdd;
    };
    $scope.removeSingle = function(item) {
        var toRemove = self.mine.indexOf(item);
        self.mine.splice(toRemove, 1);
    };

    $scope.singleMoved = function (evt) {
        var itemEl = evt.item;  // dragged HTMLElement
        // + indexes from onEnd
        console.log("ping")
    };

    $scope.stories = [
  {
    "id": 1,
    "title": "Episode I: The Phantom Menace",
    "author": "George Lucas",
    "year": 1999,
    "canon": "canon",
    "type": "film",
    "era": "prequel",
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_I_The_Phantom_Menace",
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
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_II_Attack_of_the_Clones",
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
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_III_Revenge_of_the_Sith",
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
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_IV_A_New_Hope",
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
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_V_The_Empire_Strikes_Back",
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
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_VI_Return_of_the_Jedi",
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
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_VII_The_Force_Awakens",
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
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_VIII",
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
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_IX",
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
    "url": "http://starwars.wikia.com/wiki/Rogue_One",
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
    "url": "http://starwars.wikia.com/wiki/Untitled_Han_Solo_Anthology_film",
    "img": 0
  },
  {
    "id": 12,
    "title": "Star Wars: From the Adventures of Luke Skywalker",
    "author": "George Lucas/Alan Dean Foster",
    "year": 1976,
    "canon": "canon",
    "type": "book",
    "era": "classic",
    "url": "http://starwars.wikia.com/wiki/Star_Wars_Episode_IV:_A_New_Hope_(novel)",
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
    "url": "http://starwars.wikia.com/wiki/Splinter_of_the_Mind%27s_Eye",
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
    "url": "http://starwars.wikia.com/wiki/Han_Solo_at_Stars%27_End",
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
    "url": "http://starwars.wikia.com/wiki/Han_Solo%27s_Revenge",
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
    "url": "http://starwars.wikia.com/wiki/Star_Wars_Episode_V:_The_Empire_Strikes_Back_(novel)",
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
    "url": "http://starwars.wikia.com/wiki/Han_Solo_and_the_Lost_Legacy",
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
    "url": "http://starwars.wikia.com/wiki/Star_Wars_Episode_VI:_Return_of_the_Jedi_(novel)",
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
    "url": "http://starwars.wikia.com/wiki/Lando_Calrissian_and_the_Mindharp_of_Sharu",
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
    "url": "http://starwars.wikia.com/wiki/Lando_Calrissian_and_the_Flamewind_of_Oseon",
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
    "url": "http://starwars.wikia.com/wiki/Lando_Calrissian_and_the_Starcave_of_ThonBoka",
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
    "url": "http://starwars.wikia.com/wiki/Heir_to_the_Empire",
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
    "url": "http://starwars.wikia.com/wiki/Dark_Force_Rising",
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
    "url": "http://starwars.wikia.com/wiki/The_Glove_of_Darth_Vader",
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
    "url": "http://starwars.wikia.com/wiki/The_Lost_City_of_the_Jedi",
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
    "url": "http://starwars.wikia.com/wiki/Zorba_the_Hutt%27s_Revenge",
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
    "url": "http://starwars.wikia.com/wiki/Mission_from_Mount_Yoda",
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
    "url": "http://starwars.wikia.com/wiki/Queen_of_the_Empire",
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
    "url": "http://starwars.wikia.com/wiki/Prophets_of_the_Dark_Side_(book)",
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
    "url": "http://starwars.wikia.com/wiki/The_Last_Command",
    "img": 0
  },
  {
    "id": 31,
    "title": "The Truce at Bakura",
    "author": "Kathy Tyers",
    "year": 1994,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": "http://starwars.wikia.com/wiki/The_Truce_at_Bakura",
    "img": 0
  },
  {
    "id": 32,
    "title": "Jedi Search (Jedi Academy 1)",
    "author": "Kevin J. Anderson",
    "year": 1994,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": "http://starwars.wikia.com/wiki/Jedi_Search",
    "img": 0
  },
  {
    "id": 33,
    "title": "The Courtship of Princess Leia",
    "author": "Dave Wolverton",
    "year": 1994,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": "http://starwars.wikia.com/wiki/The_Courtship_of_Princess_Leia",
    "img": 0
  },
  {
    "id": 34,
    "title": "Dark Apprentice (Jedi Academy 2)",
    "author": "Kevin J. Anderson",
    "year": 1994,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": "http://starwars.wikia.com/wiki/Dark_Apprentice_(novel)",
    "img": 0
  },
  {
    "id": 35,
    "title": "Champions of the Force",
    "author": "Kevin J. Anderson",
    "year": 1994,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": "http://starwars.wikia.com/wiki/Champions_of_the_Force",
    "img": 0
  },
  {
    "id": 36,
    "title": "The Crystal Star",
    "author": "Vonda N. McIntyre",
    "year": 1994,
    "canon": "legends",
    "type": "book",
    "era": "newrepublic",
    "url": "http://starwars.wikia.com/wiki/The_Crystal_Star",
    "img": 0
  }
];
    $scope.mine = [];
        $scope.mineConfig = {
            group: {name: 'choices'},
            sort: true,
            animation: 50,
            onUpdate: function (evt) {
                console.log("Ping")
            }
        };
    self = $scope;
}]);

var View = {
    init: function() {
        $("#options .book, #options .video, #options .comment").css('display', 'none');
    }
};

$(document).ready(function(){
    $("#movieButton").click(function(){
        $("#options .film").toggle();
    });
    $("#booksCanonButton").click(function(){
        $("#options .book.canon").toggle();
    });
    $("#booksLegendsButton").click(function(){
        $("#options .book.legends").toggle();
    });
    $("#comicsCanonButton").click(function(){
        $("#options .comment.canon").toggle();
    });
    $("#tvButton").click(function(){
        $("#options .video").toggle();
    });
    View.init();
    Model.loadChoices();
});