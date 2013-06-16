/*jslint browser: true, nomen: true, indent: 2, maxlen: 80 */
/*global Backbone, $ */

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
      "newPath": "createPath",
      "addPointTo/:id": "addPointToPath"
    },

    mainPage: function () {
    },

    getPath: function (id) {
      this.paths.get(id);
    },

    createPath: function () {
      var paths = this.paths,
        creationForm = new window.PathCreationForm({
          model: paths.create()
        });
      creationForm.render();
    },

    addPointToPath: function (id) {
      var path = this.paths.get(id),
        pointAdderForm = new window.AddPointForm({
          model: path
        });
      pointAdderForm.render();
    }
  }))();

  Backbone.history.start();
});
