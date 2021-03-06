/*jslint browser: true, nomen: true, indent: 2, maxlen: 80 */
/*global Backbone, $, L */

$(function () {
  "use strict";

  window.mindWalk = new (Backbone.Router.extend({
    initialize: function () {
      this.paths = new window.Paths();
      this.paths.fetch();
      if (this.paths.length === 0) {
        this.paths.add(window.demoPath);
        window.demoPath.save();
      }
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
      "openAnswer/:answer": "openAnswer"
    },

    // Testing Mode activated
    testing: false,

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

    openAnswer: function (encodedAnswer) {
      var answer = decodeURIComponent(encodedAnswer);
      var showAnswer = new window.ShowAnswer({
        model: answer
      });
      showAnswer.render();
    }
  }))();

  Backbone.history.start();
});
