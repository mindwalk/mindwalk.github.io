/*jslint browser: true, nomen: true, indent: 2 */
/*global module */

module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        bitwise: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noempty: true,
        // quotmark: 'single',
        undef: true,
        unused: true,
        strict: true,
        trailing: true
      },
      all: ['Gruntfile.js', 'js/*.js', '!js/vendor.min.js']
    },

    connect: {
      server: {
        options: {
          keepalive: true
        }
      }
    },

    bower: {
      install: {
      }
    },

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
    },
    copy: {
      vendor: {
        files: [
          {expand: true, flatten: true, src: ['components/leaflet/dist/images/*'], dest: 'img/'}
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('server', ['connect']);
  grunt.registerTask('vendor', [
    'bower:install',
    'uglify:vendorjs',
    'cssmin:vendorcss',
    'copy:vendor'
  ]);
};
