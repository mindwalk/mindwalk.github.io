/*jslint browser: true, nomen: true, indent: 2, maxlen: 80 */
/*global Backbone, _, $ */

(function () {
  "use strict";

  window.WelcomeView = Backbone.View.extend({
    tagName: "div",
    className: "hero-unit",
    id: "teaser",
    template: _.template($("#welcome-page").html()),

    events: {
      "click img.logo": "showActionChooser"
    },

    render: function () {
      this.$el.html(this.template());
      $("#content").empty().append(this.$el);
      return this;
    },

    showActionChooser: function () {
      window.mindWalk.navigate("chooseAction", true);
    }
  });

  window.ShowMapView = Backbone.View.extend({
    tagName: "div",
    template: _.template($("#show-map").html()),

    events: {
      "": ""
    },

    render: function () {
      this.$el.html(this.template());
      $("#content").empty().append(this.$el);
      return this;
    },

    showActionChooser: function () {
      window.mindWalk.navigate("chooseAction", true);
    }
  });

  window.ChooseActionForm = Backbone.View.extend({
    tagName: "form",
    className: "modal hide",
    template: _.template($("#choose-action").html()),

    events: {
      "click button[id=newWalk]": "openNewWalk",
      "click button[id=existingWalk]": "showExistingWalk",
      "click button.cancel": "cancel"
    },

    render: function () {
      this.$el.html(this.template());
      $("body").append(this.$el);
      this.$el.modal();
      return this;
    },

    openNewWalk: function () {
      this.$el.modal("hide");
      window.mindWalk.navigate("newPath", true);
    },

    showExistingWalk: function () {
      this.$el.modal("hide");
      window.mindWalk.navigate("selectPath", true);
    },

    cancel: function (e) {
      e.preventDefault();
      this.$el.modal("hide");
      window.mindWalk.navigate("", true);
    }
  });

}());
