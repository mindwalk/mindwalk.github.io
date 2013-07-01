/*jslint browser: true, nomen: true, indent: 2, maxlen: 80 */

(function () {
  var demoPath = new window.Path({
    title: "Backbone.js",
    description: "Important facts about Backbone.js"
  });

  demoPath.addPoint("What are the four main components of the Backbone Framework?",
    "Collection, Model, Router, View",
    {
      latitude: 50.78114,
      longitude: 6.072638
    }
  );

  demoPath.addPoint("Which framework is required when you use Backbone?",
    "Underscore",
    {
      latitude: 50.780625,
      longitude: 6.067949
    }
  );

  demoPath.addPoint("What do you need to do to talk to non-standard APIs",
    "Override the Collection method sync",
    {
      latitude: 50.778325,
      longitude: 6.063743
    }
  );

  demoPath.addPoint("Which of the components is responsible to validate data?",
    "The Model",
    {
      latitude: 50.777972,
      longitude: 6.06001
    }
  );

  window.demoPath = demoPath;
}());
