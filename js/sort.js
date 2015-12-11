var LineupSort = angular.module('LineupSort', ['ng-sortable']);

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
            'data-related="denverpost" ' +
            'data-hashtags="nba" data-text="Here\'s who the #Nuggets should start!">' +
            'Tweet</a><br>');
        twttr.widgets.load();
        $("meta[property='og\\:url']").attr("content", newUrl);

    },
    restoreChoices: function () {
        if (sessionStorage.order) {
            loadStr = sessionStorage.order;
            var loadIDs = JSON.parse(loadStr);
            for (var i = 0, len = loadIDs.length; i < len; i++) {
                for (var f = 0, fen = self.players.length; f < fen; f++) {
                    if (loadIDs[i] === self.players[f].id) {
                        self.players[f].added = true;
                        var whereAdd = self.mine.length;
                        self.mine[whereAdd] = self.players[f];
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
                for (var f = 0, fen = self.players.length; f < fen; f++) {
                    if (loadIDs[i] === self.players[f].id) {
                        self.players[f].added = true;
                        var whereAdd = self.mine.length;
                        self.mine[whereAdd] = self.players[f];
                    }
                }
            }
        }
    },
    clearChoices: function() {
        sessionStorage.order = "";
        self.$apply(function(){
            for (var i = 0, len = self.players.length; i < len; i++) {
                self.players[i].added = false;
            }
            self.mine = [];
        });
    },
};

angular.module('lineupSort', ['ng-sortable'])
.controller('lineupSortCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.playersConfig = {
        ghostClass: "ghostclass",
    };
    $scope.addSingle = function(index) {
        var toAdd = [];
        for (var i = 0, len = self.players.length; i < len; i++) {
            if (self.players[i].id === index) {
                self.players[i].added = true;
                var whereAdd = self.mine.length;
                self.mine[whereAdd] = self.players[i];
            }
        }
        Model.saveChoices();
    };
    $scope.removeSingle = function(item) {
        for (var i = 0, len = self.players.length; i < len; i++) {
            if (self.players[i].id === item.id) {
                self.players[i].added = false;
            }
        }
        var toRemove = self.mine.indexOf(item);
        self.mine.splice(toRemove, 1);
        Model.saveChoices();
    };

    $scope.players = [
  {
    "id": 1,
    "Position": "F",
    "Number": "00",
    "First": "Darrell",
    "Last": "Arthur",
    "Height": "6 ft 9 in",
    "Weight": "235 lb",
    "Birthdate": "1988–03–25",
    "From": "Kansas",
    "added": false
  },
  {
    "id": 2,
    "Position": "G",
    "Number": "5",
    "First": "Will",
    "Last": "Barton",
    "Height": "6 ft 6 in",
    "Weight": "175 lb",
    "Birthdate": "1991–01–06",
    "From": "Memphis",
    "added": false
  },
  {
    "id": 3,
    "Position": "F",
    "Number": "21",
    "First": "Wilson",
    "Last": "Chandler",
    "Height": "6 ft 8 in",
    "Weight": "225 lb",
    "Birthdate": "1987–05–10",
    "From": "DePaul",
    "added": false
  },
  {
    "id": 4,
    "Position": "F",
    "Number": "35",
    "First": "Kenneth",
    "Last": "Faried",
    "Height": "6 ft 8 in",
    "Weight": "228 lb",
    "Birthdate": "1989–11–19",
    "From": "Morehead State",
    "added": false
  },
  {
    "id": 5,
    "Position": "G",
    "Number": "4",
    "First": "Randy",
    "Last": "Foye",
    "Height": "6 ft 4 in",
    "Weight": "213 lb",
    "Birthdate": "1983–09–24",
    "From": "Villanova",
    "added": false
  },
  {
    "id": 6,
    "Position": "F",
    "Number": "8",
    "First": "Danilo",
    "Last": "Gallinari",
    "Height": "6 ft 10 in",
    "Weight": "225 lb",
    "Birthdate": "1988–08–08",
    "From": "Italy",
    "added": false
  },
  {
    "id": 7,
    "Position": "G",
    "Number": "14",
    "First": "Gary",
    "Last": "Harris",
    "Height": "6 ft 4 in",
    "Weight": "210 lb",
    "Birthdate": "1994–09–14",
    "From": "Michigan State",
    "added": false
  },
  {
    "id": 8,
    "Position": "F/C",
    "Number": "7",
    "First": "JJ",
    "Last": "Hickson",
    "Height": "6 ft 9 in",
    "Weight": "242 lb",
    "Birthdate": "1988–09–04",
    "From": "North Carolina State",
    "added": false
  },
  {
    "id": 9,
    "Position": "C",
    "Number": "15",
    "First": "Nikola",
    "Last": "Jokic",
    "Height": "6 ft 11 in",
    "Weight": "250 lb",
    "Birthdate": "1995–02–19",
    "From": "Serbia",
    "added": false
  },
  {
    "id": 10,
    "Position": "F/C",
    "Number": "77",
    "First": "Joffrey",
    "Last": "Lauvergne",
    "Height": "6 ft 11 in",
    "Weight": "220 lb",
    "Birthdate": "1991–09–30",
    "From": "France",
    "added": false
  },
  {
    "id": 11,
    "Position": "G/F",
    "Number": "3",
    "First": "Mike",
    "Last": "Miller",
    "Height": "6 ft 8 in",
    "Weight": "218 lb",
    "Birthdate": "1980–02–19",
    "From": "Florida",
    "added": false
  },
  {
    "id": 12,
    "Position": "G",
    "Number": "0",
    "First": "Emmanuel",
    "Last": "Mudiay",
    "Height": "6 ft 5 in",
    "Weight": "200 lb",
    "Birthdate": "1996–03–05",
    "From": "Prime Prep Academy (TX)",
    "added": false
  },
  {
    "id": 13,
    "Position": "G",
    "Number": "1",
    "First": "Jameer",
    "Last": "Nelson",
    "Height": "6 ft 0 in",
    "Weight": "190 lb",
    "Birthdate": "1982–02–09",
    "From": "Saint Joseph's",
    "added": false
  },
  {
    "id": 14,
    "Position": "C",
    "Number": "23",
    "First": "Jusuf",
    "Last": "Nurkic",
    "Height": "6 ft 11 in",
    "Weight": "280 lb",
    "Birthdate": "1994–08–23",
    "From": "Bosnia and Herzegovina",
    "added": false
  },
  {
    "id": 15,
    "Position": "F",
    "Number": "16",
    "First": "Kostas",
    "Last": "Papanikolaou",
    "Height": "6 ft 8 in",
    "Weight": "235 lb",
    "Birthdate": "1990–07–31",
    "From": "Greece",
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

}]);

var View = {

};



$(document).ready(function(){
    $("#advancedButton").click(function(){
        $("#toggleButtons").toggle();
        var glyph = $("#advancedGlyph").attr("class");
        if (glyph === "glyphicon glyphicon-zoom-in") {
            $("#advancedGlyph").attr("class", "glyphicon glyphicon-zoom-out")
        } else {
            $("#advancedGlyph").attr("class", "glyphicon glyphicon-zoom-in");
        }
    });

    $(function () {
        $('[data-toggle="popover"]').popover();
    });
});