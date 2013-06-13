/*jslint browser: true, nomen: true, indent: 2, maxlen: 80 */
/*global Backbone, _, $ */

(function () {
  "use strict";

  window.Point = Backbone.Model.extend({
    defaults: {
      // latitude
      // longitude
      // question
      // answer
      createdOn: (new Date()).toLocaleString()
    }
  });

  window.Path = Backbone.Model.extend({
    defaults: {
      title: "No Title",
      description: "No Description",
      createdOn: (new Date()).toLocaleString(),
      tries: 0,
      points: []
    },

    // Add a new point to this path
    addPoint: function (question, answer) {
      var points, point, path;
      path = this;
      points = this.get("points");
      navigator.geolocation.getCurrentPosition(function (geo) {
        point = new window.Point({
          latitude: geo.coords.latitude,
          longitude: geo.coords.longitude,
          question: question,
          answer: answer
        });

        points.push(point.toJSON());
        path.set("points", points);
      });
    },

    // Call a function for each point on this path
    eachPoint: function (handler) {
      _.each(this.get("points"), function (rawPoint) {
        handler(new window.Point(rawPoint));
      });
    }
  });
}());
