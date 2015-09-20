angular.module('dod.dashboard.map', []).directive('map', function ($log) {
  var Constants = {
    latTotal: 180,
    longTotal: 360,
    latMultiplier: 3,
    longMultiplier: 3
  };
  var template = [
    "<div class=\"dashboard-map\">",
    " <div ng-repeat='point in map.points' class='point animated' ng-class='point.type' ng-style=\"{'top': map.longLocation(point.long), 'left': map.latLocation(point.lat)}\"></div>",
    "</div>"
  ];
  return {
    template: template.join(""),
    replace: true,
    link: function (scope, elem) {
      var grid = [];
      $log.info(elem);
      for (var i = 0; i < Constants.latTotal; i++ ) {
        grid.push("<div class='lat'>");
        for (var j = 0; j < Constants.longTotal; j++ ) {
          grid.push('<div class="long"></div>');
        }
        grid.push("</div>");
      }
      elem.append(grid.join(""));
    },
    controllerAs: 'map',
    controller: function () {
      var map = this;
      map.longLocation = function (point) {
        return (point * Constants.longMultiplier) + "px";
      };
      map.latLocation = function (point) {
        return (point * Constants.latMultiplier) + "px";
      };
      map.points = [
        {lat: 100, long: 100, type: 'md'},
        {lat: 90, long: 10, type: 'md'},
        {lat: 300, long: 100, type: 'md'},
      ];
      return map;
    }
  };
});

/*
 longitude: vertical : 360 lines
 latitude: horizontal : 180 lines
 * */
