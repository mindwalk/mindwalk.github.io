/*jslint browser: true, nomen: true, indent: 2, maxlen: 80 */
/*global Backbone, _, $ */

(function () {
  "use strict";

  window.PathCreationForm = Backbone.View.extend({
    tagName: "form",
    className: "modal hide fade",
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
      var title, description;
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
}());
