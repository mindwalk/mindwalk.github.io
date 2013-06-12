/*jslint browser: true */
/*global Backbone */

(function () {
  "use strict";

  window.Point = Backbone.Model.extend({
    defaults: {
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

    addPoint: function(question, answer, coords) {
      var point = new window.Point({
        latitude: coords.latitude,
        longitude: coords.longitude,
        question: question,
        answer: answer
      });

      this.attributes.points.push(point.toJSON);
    }
  });
}());
