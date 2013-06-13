/*jslint browser: true, nomen: true, indent: 2, maxlen: 80 */
/*global Backbone, _, $ */

$(function () {
  "use strict";

  window.mindWalk = new (Backbone.Router.extend({
    initialize: function () {
      this.paths = new window.Paths();
      this.paths.fetch();
    },

    routes: {
      "": "mainPage",
      "paths/:id": "getPath",
      "newPath": "createPath"
    },

    mainPage: function () {
    },

    getPath: function (id) {
      var path = this.paths.get(id);
    },

    createPath: function () {
      var paths = this.paths;
      var creationForm = new window.PathCreationForm({
        model: paths.create()
      });
      creationForm.render();
    },

    addPointToPath: function () {
    }
  }))();

  Backbone.history.start();
});
