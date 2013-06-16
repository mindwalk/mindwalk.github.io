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
    },

    cssmin: {
      vendorcss: {
        options: {
          banner: '/*! DO NOT CHANGE THIS FILE BY HAND. \n Last generated at <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          keepSpecialComments: 0
        },
        files: {
          'css/vendor.min.css': [
            "components/bootstrap.css/css/bootstrap.css",
            "components/bootstrap.css/css/bootstrap-responsive.css",
            "components/leaflet/dist/leaflet.css"
          ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify:vendorjs', 'cssmin:vendorcss']);
};
