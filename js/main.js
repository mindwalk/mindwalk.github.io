/*jslint browser: true, nomen: true, indent: 2, maxlen: 100 */
/*global $, console, L */

$(function () {
  "use strict";

  var x = document.getElementById("map");
  function getLocation(callBack) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callBack);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    window.waypoints = new Array();
    window.wpNo = 0;
    var radius = position.coords.accuracy / 2;
    var latlng = new L.LatLng(position.coords.latitude,position.coords.longitude);
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
  }

  function addCurrentPosition(position) {
    var radius = position.coords.accuracy / 2;
    var lat = position.coords.latitude; 
    var lng = position.coords.longitude;
    //Testing:
    lat = parseInt(lat) + (Math.random() - 0.5)/10;
    lng = parseInt(lng) + (Math.random() - 0.5)/10;
    var latlng = new L.LatLng(lat,lng);

    window.waypoints.push(latlng);
    window.polyline = L.polyline(window.waypoints, {color: 'blue'});
    window.karte.fitBounds(window.polyline.getBounds());
    window.wpNo++;

    L.marker(latlng).addTo(window.karte)
    .bindPopup('Waypoint ' + window.wpNo)
    .openPopup();

    // Add radius (accuracy)
    L.circle(latlng, radius).addTo(window.karte);
  }

  function joinToPath() {
    // create a red polyline from an arrays of LatLng points
    window.polyline = L.polyline(window.waypoints, {color: 'blue'}).addTo(window.karte);
    
    // zoom the map to the polyline
    window.karte.fitBounds(window.polyline.getBounds());
  }

  $("#addPosition").click(function () {
    getLocation(addCurrentPosition);
  });

  $("#addQuestion").click(function () {
    document.all.questionModal.innerHTML = $('#point-form').html();
  });

  $("#joinToPath").click(function () {
    joinToPath();
  });

  L.Icon.Default.imagePath = "img/";
  getLocation(showPosition);
});
