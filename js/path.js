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
      tries: 0,
      points: [],
      createdOn: (new Date()).toLocaleString()
    },

    // Add a new point to this path
    addPoint: function (question, answer, coords) {
      var path = this,
        points = this.get("points"),
        point = new window.Point({
          latitude: coords.latitude,
          longitude: coords.longitude,
          question: question,
          answer: answer
        });

      points.push(point.toJSON());
      path.set("points", points);
    },

    // Call a function for each point on this path
    eachPoint: function (handler) {
      _.each(this.get("points"), function (rawPoint) {
        handler(new window.Point(rawPoint));
      });
    }
  });
}());
