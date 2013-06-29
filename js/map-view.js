/*jslint browser: true, nomen: true, indent: 2, maxlen: 100, plusplus: true */
/*global Backbone, $, _, console, L */

(function () {
  "use strict";

  window.MapView = Backbone.View.extend({
    tagName: "div",
    template: _.template($("#show-map").html()),

    events: {
      "click #addQuestion": "addQuestion"
    },

    render: function () {
      var showPosition = this.showPosition,
        initializeMap = this.initializeMap,
        joinToPath = this.joinToPath,
        model = this.model;

      this.$el.html(this.template());
      $("#content").empty().append(this.$el);
      this.getLocation(function (latitude, longitude) {
        initializeMap(latitude, longitude);
        model.eachPoint(function (point) {
          showPosition(point);
        });
        joinToPath();
      });
      return this;
    },

    addQuestion: function () {
      window.mindWalk.navigate("addPointTo/" + this.model.get("id"), true);
    },

    getLocation: function (callBack) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          callBack(position.coords.latitude, position.coords.longitude);
        });
      } else {
        // FIXME
        console.log("Oh oh.");
      }
    },

    initializeMap: function (latitude, longitude) {
      var latlng = new L.LatLng(latitude, longitude);
      window.waypoints = [];
      window.karte = L.map('map').setView(latlng, 17);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(window.karte);

      L.marker(latlng).addTo(window.karte);
    },

    showPosition: function (point) {
      var latlng = new L.LatLng(point.get("latitude"), point.get("longitude"));
      window.waypoints.push(latlng);
      L.marker(latlng).addTo(window.karte).bindPopup(point.get("question")).openPopup();
    },

    joinToPath: function () {
      // create a red polyline from an arrays of LatLng points
      window.polyline = L.polyline(window.waypoints, {color: 'blue'}).addTo(window.karte);

      // zoom the map to the polyline
      window.karte.fitBounds(window.polyline.getBounds());
    }
  });
}());
