/*jslint browser: true, nomen: true, indent: 2, maxlen: 80 */
/*global Backbone, _, $ */

(function () {
  "use strict";

  window.WelcomeView = Backbone.View.extend({
    tagName: "div",
    className: "hero-unit",
    id: "teaser",
    template: _.template($("#welcome-page").html()),

    render: function () {
      this.$el.html(this.template());
      $("#content").empty().append(this.$el);
      return this;
    }
  });
}());
