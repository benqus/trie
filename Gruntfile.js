module.exports = function (grunt) {

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({

        pkg: pkg,

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                src: [
                    'lib/**/*.js',
                    'test/**/*.js',
                ]
            }
        },

        mocha: {
            test: {
                src: ['test/spec-runner.html']
            }
        }

    });

    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['jshint:all', 'mocha:test']);

};