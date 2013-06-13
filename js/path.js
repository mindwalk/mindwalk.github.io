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
    addPoint: function (question, answer, coords) {
      var points, point;
      points = this.get("points");
      point = new window.Point({
        latitude: coords.latitude,
        longitude: coords.longitude,
        question: question,
        answer: answer
      });

      points.push(point.toJSON());
      this.set("points", points);
    },

    // Call a function for each point on this path
    eachPoint: function (handler) {
      _.each(this.get("points"), function (rawPoint) {
        handler(new window.Point(rawPoint));
      });
    }
  });
}());
