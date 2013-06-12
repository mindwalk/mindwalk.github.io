/*jslint browser: true */
/*global Backbone, Path */

(function () {
  "use strict";

  window.Paths = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("paths"),
    model: Path
  });

  window.paths = new window.Paths();
}());
