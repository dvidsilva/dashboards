angular.module('dod.dashboard.map', []).directive('map', function ($log) {
  var Constants = {
    latTotal: 180,
    longTotal: 360,
    latMultiplier: 3,
    longMultiplier: 3
  };
  var template = [
    "<div class=\"dashboard-map\">",
    "  <div ng-repeat='point in map.points' class='point animated' ng-class='point.type' ng-style=\"{'left': map.longLocation(point.long), 'top': map.latLocation(point.lat)}\">",
    "    <span>{{point.label}}</span>",
    "  </div>",
    "</div>",
    "<h2>debugger <small>Add points to the map</small></h2>",
    "<div ng-repeat='point in map.points' style='padding: 4px; border-bottom: 1px solid lightgray;'>",
    "  <input ng-model='point.lat' placeholder='lat'> ",
    "  <input ng-model='point.long' placeholder='long'> ",
    "  <input ng-model='point.label' placeholder='label'> ",
    "  <input ng-model='point.type' placeholder='type(md, psych, lc)'> ",
    "  <button ng-click='map.removePoint($index)' class='btn btn-danger btn-sm' >Remove</button>",
    "</div>",
    "<div ><button ng-click='map.points.push({})' class='btn btn-primary' >Add</button></div>",
    "</div>"
  ];
  return {
    template: template.join(""),
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
        // $log.info(point);
        return (point * Constants.latMultiplier) + "px";
      };
      map.removePoint = function ($index) {
        map.points.splice($index,1);
      };
      map.points = [
        {lat: 37.7833, long: -122.4167, type: 'md', label: 'SF'},
        {lat: 40.7833, long: -122.4167, type: 'lc', label: ''},
        {lat: 40.7127, long: -74.0059, type: 'psych', label: 'New York'},
        {lat: 35.6833, long: 139.6833, type: 'md', label: 'Tokio'},
        {lat: 4.5981, long: -74.0758, type: 'psych', label: 'Bogota'},
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
