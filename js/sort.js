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
        sessionStorage.setItem('order', saveStr);
        var urlStr = Base64.encode(saveStr);
        newUrl = "http://nicetryinternet.com/star-wars-ranker/index.htm?" + urlStr;
        $("#shareUrl").val(newUrl);
        $("#tw-share").html('<a class="twitter-share-button" href="https://twitter.com/share" ' +
            'data-size="default" data-url="' + newUrl + '" ' +
            'data-related="nicetryinternet,daveburdick,starwars,tordotcom" ' +
            'data-hashtags="starwars" data-text="Everything Star Wars, ranked. By me.">' +
            'Tweet</a><br>');
        twttr.widgets.load();
        $("meta[property='og\\:url']").attr("content", newUrl);

    },
    restoreChoices: function () {
        if (sessionStorage.order) {
            loadStr = sessionStorage.order;
            var loadIDs = JSON.parse(loadStr);
            for (var i = 0, len = loadIDs.length; i < len; i++) {
                for (var f = 0, fen = self.stories.length; f < fen; f++) {
                    if (loadIDs[i] === self.stories[f].id) {
                        self.stories[f].added = true;
                        var whereAdd = self.mine.length;
                        self.mine[whereAdd] = self.stories[f];
                    }
                }
            }
        }

    },
    loadChoices: function() {
        var url = window.location.href;
        if (url.indexOf('?') === -1) {
            Model.restoreChoices();
        } else {
            sessionStorage.order = "";
            var loadUrl = url.slice(window.location.href.indexOf('?') + 1).split();
            var decodeUrl = loadUrl.toString();
            var loadStr = Base64.decode(decodeUrl);
            var loadIDs = JSON.parse(loadStr);
            for (var i = 0, len = loadIDs.length; i < len; i++) {
                for (var f = 0, fen = self.stories.length; f < fen; f++) {
                    if (loadIDs[i] === self.stories[f].id) {
                        self.stories[f].added = true;
                        var whereAdd = self.mine.length;
                        self.mine[whereAdd] = self.stories[f];
                    }
                }
            }
        }
    },
    clearChoices: function() {
        sessionStorage.order = "";
        self.$apply(function(){
            for (var i = 0, len = self.stories.length; i < len; i++) {
                self.stories[i].added = false;
            }
            self.mine = [];
        });
    },
};

angular.module('swSort', ['ng-sortable'])
.controller('swSortCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.storiesConfig = {
        ghostClass: "ghostclass",
    };
    $scope.addSingle = function(index) {
        var toAdd = [];
        for (var i = 0, len = self.stories.length; i < len; i++) {
            if (self.stories[i].id === index) {
                self.stories[i].added = true;
                var whereAdd = self.mine.length;
                self.mine[whereAdd] = self.stories[i];
            }
        }
        Model.saveChoices();
    };
    $scope.removeSingle = function(item) {
        for (var i = 0, len = self.stories.length; i < len; i++) {
            if (self.stories[i].id === item.id) {
                self.stories[i].added = false;
            }
        }
        var toRemove = self.mine.indexOf(item);
        self.mine.splice(toRemove, 1);
        Model.saveChoices();
    };

    $scope.stories = [
  {
    "id": 1,
    "title": "Episode I: The Phantom Menace",
    "author": "George Lucas",
    "year": 1999,
    "canon": "canon",
    "type": "film",
    "era": "Rise of the Empire",
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_I_The_Phantom_Menace",
    "img": 0,
    "added": false
  },
  {
    "id": 2,
    "title": "Episode II: Attack of the Clones",
    "author": "George Lucas/Jonathan Hales",
    "year": 2002,
    "canon": "canon",
    "type": "film",
    "era": "Rise of the Empire",
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_II_Attack_of_the_Clones",
    "img": 0,
    "added": false
  },
  {
    "id": 3,
    "title": "Episode III: Revenge of the Sith",
    "author": "George Lucas",
    "year": 2005,
    "canon": "canon",
    "type": "film",
    "era": "Rise of the Empire",
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_III_Revenge_of_the_Sith",
    "img": 0,
    "added": false
  },
  {
    "id": 4,
    "title": "Episode IV: A New Hope",
    "author": "George Lucas",
    "year": 1977,
    "canon": "canon",
    "type": "film",
    "era": "Rebellion",
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_IV_A_New_Hope",
    "img": 0,
    "added": false
  },
  {
    "id": 5,
    "title": "Episode V: The Empire Strikes Back",
    "author": "Leigh Brackett/Lawrence Kasdan",
    "year": 1980,
    "canon": "canon",
    "type": "film",
    "era": "Rebellion",
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_V_The_Empire_Strikes_Back",
    "img": 0,
    "added": false
  },
  {
    "id": 6,
    "title": "Episode VI: Return of the Jedi",
    "author": "Lawrence Kasdan/George Lucas",
    "year": 1983,
    "canon": "canon",
    "type": "film",
    "era": "Rebellion",
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_VI_Return_of_the_Jedi",
    "img": 0,
    "added": false
  },
  {
    "id": 7,
    "title": "Episode VII: The Force Awakens",
    "author": "Lawrence Kasdan/JJ Abrams/Michael Arndt",
    "year": 2015,
    "canon": "canon",
    "type": "film",
    "era": "Aftermath",
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_VII_The_Force_Awakens",
    "img": 0,
    "added": false
  },
  {
    "id": 8,
    "title": "Episode VIII",
    "author": "Rian Johnson",
    "year": 2017,
    "canon": "canon",
    "type": "film",
    "era": "unreleased",
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_VIII",
    "img": 0,
    "added": false
  },
  {
    "id": 9,
    "title": "Episode IX",
    "author": "...",
    "year": 2019,
    "canon": "canon",
    "type": "film",
    "era": "unreleased",
    "url": "http://starwars.wikia.com/wiki/Star_Wars:_Episode_IX",
    "img": 0,
    "added": false
  },
  {
    "id": 10,
    "title": "Rogue One: A Star Wars Story",
    "author": "John Knoll/Chris Weitz/Gary Whitta",
    "year": 2016,
    "canon": "canon",
    "type": "film",
    "era": "Rebellion",
    "url": "http://starwars.wikia.com/wiki/Rogue_One",
    "img": 0,
    "added": false
  },
  {
    "id": 11,
    "title": "Untitled Han Solo film",
    "author": "Jon Kasdan/Lawrence Kasdan",
    "year": 2018,
    "canon": "canon",
    "type": "film",
    "era": "unreleased",
    "url": "http://starwars.wikia.com/wiki/Untitled_Han_Solo_Anthology_film",
    "img": 0,
    "added": false
  }
];
    $scope.mine = [];
        $scope.mineConfig = {
            group: {name: 'choices'},
            pull: false,
            put: false,
            sort: true,
            animation: 50,
            handle: '.handle',
            onAdd: function(evt) {
                var where = self.mine.length;
                self.mine[where].added = true;
            },
            onUpdate: function (evt) {
                Model.saveChoices();
            }
        };
    self = $scope;

    $http.get('http://nicetryinternet.com/star-wars-ranker/js/stories.json').
    success(function(data, status, headers, config) {
        $scope.stories = data;
        Model.loadChoices();
        View.init();
    }).
    error(function(data, status, headers, config) {
      // log error
    });
}]);

var View = {
    init: function() {
        $("#options .book, #options .tv, #options .comic").css('display', 'none');
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
        $("#options .comics.canon").toggle();
    });
    $("#tvButton").click(function(){
        $("#options .tv").toggle();
    });
    $("#eraButton").click(function(){
        $(".badge").toggle();
    });
    $("#advancedButton").click(function(){
        $("#toggleButtons").toggle();
        $("#advancedButton").toggle();
    });

    $(function () {
        $('[data-toggle="popover"]').popover();
    });
    View.init();
});