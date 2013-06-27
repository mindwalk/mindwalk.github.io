/*jslint browser: true, nomen: true, indent: 2, maxlen: 80 */
/*global Backbone, $, L */

$(function () {
  "use strict";

  window.mindWalk = new (Backbone.Router.extend({
    initialize: function () {
      this.paths = new window.Paths();
      this.paths.fetch();
      L.Icon.Default.imagePath = "img/";
    },

    routes: {
      "": "mainPage",
      "paths/:id": "getPath",
      "newPath": "createPath",
      "addPointTo/:id": "addPointToPath",
      "chooseAction": "chooseAction",
      "showMap/:id": "showMap",
      "listWalks": "listWalks",
      "selectPath": "selectPath",
      "walkPath/:id": "walkPath"
    },

    // Testing Mode activated
    testing: true,

    mainPage: function () {
      var welcomeView = new window.WelcomeView();
      welcomeView.render();
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
    },

    chooseAction: function () {
      var chooseActionForm = new window.ChooseActionForm();
      chooseActionForm.render();
    },

    showMap: function (id) {
      var path = this.paths.get(id),
        mapView = new window.MapView({
          model: path
        });
      mapView.render();
    },

    selectPath: function () {
      var selectPathForm = new window.SelectPathForm({
        collection: this.paths
      });
      selectPathForm.render();
    },

    walkPath: function (id) {
    }
  }))();

  Backbone.history.start();
});
