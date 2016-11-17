/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
// require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
'use strict'
module.exports = function (grunt) {
    
    grunt.initConfig({
        'babel': {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'app-min.js': ['app-min.js']
                }
            }
        },
        
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    'Scripts/Common/Urls.js',

                    'Scripts/Models/Article.js',
                    'Scripts/Models/Articles.js',
                    'Scripts/Models/SourceItem.js',
                    'Scripts/Models/UrlsToLogos.js',

                    'Scripts/Services/SourceService.js',
                    'Scripts/Services/ArticleService.js',

                    'Scripts/Controllers/SourceController.js',

                    'Scripts/Views/SourcesView.js',

                    'Scripts/app.js'],
                dest: 'app-min.js'
            },
        },
        uglify: {
            my_target: {
                files: {
                    'app-min.js': ['app-min.js']
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('comb', ['concat']);
    //grunt.registerTask('babel', ['babel']);
};