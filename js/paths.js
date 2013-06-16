/*jslint browser: true, nomen: true, indent: 2, maxlen: 80 */
/*global Backbone */

(function () {
  "use strict";

  window.Paths = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("paths"),
    model: window.Path
  });
}());
