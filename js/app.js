$(function () {
  window.mindWalk = new (Backbone.Router.extend({
    routes: {
      "": "mainPage"
    },

    mainPage: function() {
      window.paths.fetch();

      var path = window.paths.create();
      navigator.geolocation.getCurrentPosition(function(geo) {
        path.addPoint("What is your name?", "Sir Lancelot", geo.coords);
      });
    }
  }))();

  Backbone.history.start();
});
