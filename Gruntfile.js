'use strict';

/* jshint node: true */

module.exports = function(grunt) {
  require('jit-grunt')(grunt);
  grunt.initConfig({
    watch: {
      livereload: {
         options: {
           livereload: '<%= connect.options.livereload %>'
         },
         files: [
           '*.html',
           '*.js'
         ],
         tasks: []
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost' // '0.0.0.0' to access the server from outside
      },

      livereload: {
        options: {
          open: true,
          base: [
            '.'
          ]
        }
      }
    }
  });

  grunt.registerTask('default', ['connect', 'watch']);
};
