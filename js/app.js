/*jslint browser: true, nomen: true, indent: 2, maxlen: 80 */
/*global Backbone, _, $ */

$(function () {
  "use strict";

  window.mindWalk = new (Backbone.Router.extend({
    routes: {
      "": "mainPage",
      "paths/:id": "getPath"
    },

    mainPage: function () {
      this.paths = new window.Paths();
      this.paths.fetch();
    },

    getPath: function (id) {
      var path = this.paths.get(id);
    },

    createPath: function () {
      // path = this.paths.create();
    },

    addPointToPath: function () {
      // navigator.geolocation.getCurrentPosition(function (geo) {
      //   path.addPoint("What is your name?", "Sir Lancelot", geo.coords);
      //   path.save();
      // });
    }
  }))();

  Backbone.history.start();
});
