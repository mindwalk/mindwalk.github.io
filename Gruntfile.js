module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! DO NOT CHANGE THIS FILE BY HAND. \n Last generated at <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      vendorjs: {
        src: [
              "components/jquery/jquery.js",
              "components/underscore/underscore.js",
              "components/backbone/backbone.js",
              "components/backbone.localStorage/backbone.localStorage.js",
              "components/bootstrap.css/js/bootstrap.js",
              "components/leaflet/dist/leaflet.js"
        ],
        dest: 'js/vendor.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify:vendorjs']);
};
