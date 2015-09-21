angular.module('dod.dashboard.map', []).directive('map', function ($log) {
  var Constants = {
    latTotal: 180,
    longTotal: 360,
    latMultiplier: 3,
    longMultiplier: 3
  };
  var template = [
    "<div class=\"dashboard-map\">",
    " <div ng-repeat='point in map.points' class='point animated' ng-class='point.type' ng-style=\"{'left': map.longLocation(point.long), 'top': map.latLocation(point.lat)}\">",
    "<span>{{point.label}}</span>",
    "</div>",
    "</div>"
  ];
  return {
    template: template.join(""),
    replace: true,
    link: function (scope, elem) {
      var grid = [];
      $log.info(elem);
      for (var i = 1; i <= Constants.latTotal; i++ ) {
        grid.push("<div class='lat' lat='"+i+"'>");
        for (var j = 1; j <= Constants.longTotal; j++ ) {
          grid.push('<div class="long" long="'+j+'"></div>');
        }
        grid.push("</div>");
      }
      elem.prepend(grid.join(""));
    },
    controllerAs: 'map',
    controller: function () {
      var map = this;
      map.longLocation = function (point) {
        point = point + 180;
        return (point * Constants.longMultiplier) + "px";
      };
      map.latLocation = function (point) {
        point = 90 - point;
        $log.info(point);
        return (point * Constants.latMultiplier) + "px";
      };
      map.points = [
        {lat: 37.7833, long: -122.4167, type: 'md', label: 'SF'},
        {lat: 40.7127, long: -74.0059, type: 'md', label: 'New York'},
        {lat: 35.6833, long: 139.6833, type: 'md', label: 'Tokio'},
        {lat: 4.5981, long: -74.0758, type: 'md', label: 'Bogota'},
        {lat: 0.2333, long: -78.5167, type: 'md', label: 'Quito'},
      ];
      return map;
    }
  };
});

/*
 longitude: vertical : 360 lines
 latitude: horizontal : 180 lines
 */
