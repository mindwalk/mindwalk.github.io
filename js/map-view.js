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
      this.$el.html(this.template());
      $("#content").empty().append(this.$el);
      this.x = document.getElementById("map");
      this.getLocation(this.showPosition);
      return this;
    },

    addQuestion: function () {
      window.mindWalk.navigate("addPointTo/" + this.model.get("id"), true);
    },

    getLocation: function (callBack) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callBack);
      } else {
        this.x.innerHTML = "Geolocation is not supported by this browser.";
      }
    },

    showPosition: function (position) {
      var radius, latlng;
      window.waypoints = [];
      window.wpNo = 0;
      radius = position.coords.accuracy / 2;
      latlng = new L.LatLng(position.coords.latitude, position.coords.longitude);
      window.waypoints.push(latlng);

      console.log("Latitude: " + position.coords.latitude +
        "\nLongitude: " + position.coords.longitude +
        "\nAccuracy: " + position.coords.accuracy);
      console.log(position);

      window.karte = L.map('map').setView(latlng, 17);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(window.karte);

      // add a marker in the given location, attach some popup content to it and open the popup
      L.marker(latlng).addTo(window.karte).bindPopup('You are here ;)').openPopup();

      // Add radius (accuracy)
      L.circle(latlng, radius).addTo(window.karte);
    },

    addCurrentPosition: function (position) {
      var radius = position.coords.accuracy / 2,
        lat = position.coords.latitude,
        lng = position.coords.longitude,
        latlng;
      //Testing:
      lat = parseInt(lat, 10) + (Math.random() - 0.5) / 10;
      lng = parseInt(lng, 10) + (Math.random() - 0.5) / 10;
      latlng = new L.LatLng(lat, lng);

      window.waypoints.push(latlng);
      window.polyline = L.polyline(window.waypoints, {color: 'blue'});
      window.karte.fitBounds(window.polyline.getBounds());
      window.wpNo++;

      L.marker(latlng).addTo(window.karte)
        .bindPopup('Waypoint ' + window.wpNo)
        .openPopup();

      // Add radius (accuracy)
      L.circle(latlng, radius).addTo(window.karte);
    },

    joinToPath: function () {
      // create a red polyline from an arrays of LatLng points
      window.polyline = L.polyline(window.waypoints, {color: 'blue'}).addTo(window.karte);

      // zoom the map to the polyline
      window.karte.fitBounds(window.polyline.getBounds());
    }
  });
}());
