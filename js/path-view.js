/*jslint browser: true, nomen: true, indent: 2, maxlen: 80 */
/*global Backbone, _, $ */

(function () {
  "use strict";

  window.PathCreationForm = Backbone.View.extend({
    tagName: "form",
    className: "modal hide",
    template: _.template($("#path-form").html()),

    events: {
      "click button[type=submit]": "create",
      "click button.cancel": "cancel"
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      $("body").append(this.$el);
      this.$el.modal();
      return this;
    },

    create: function (e) {
      e.preventDefault();
      this.model.set({
        "title": $("input[name=title]", this.$el).val(),
        "description": $("textarea[name=description]", this.$el).val()
      });
      this.model.save();
      this.$el.modal("hide");
      window.mindWalk.navigate("");
    },

    cancel: function (e) {
      e.preventDefault();
      this.model.destroy();
      this.$el.modal("hide");
      window.mindWalk.navigate("");
    }
  });

  window.AddPointForm = Backbone.View.extend({
    tagName: "form",
    className: "modal hide",
    template: _.template($("#point-form").html()),

    events: {
      "click button[type=submit]": "create",
      "click button.cancel": "cancel"
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      $("body").append(this.$el);
      this.$el.modal();
      return this;
    },

    create: function (e) {
      var question = $("input[name=question]", this.$el).val(),
        answer = $("textarea[name=answer]", this.$el).val(),
        model = this.model;
      e.preventDefault();

      // Maybe show a loading screen for searching for the current position:
      // or a [ladda](https://github.com/hakimel/Ladda)
      navigator.geolocation.getCurrentPosition(function (geo) {
        model.addPoint(question, answer, geo.coords);
        model.save();
      });

      this.$el.modal("hide");
      window.mindWalk.navigate("");
    },

    cancel: function (e) {
      e.preventDefault();
      this.$el.modal("hide");
      window.mindWalk.navigate("");
    }
  });
}());
