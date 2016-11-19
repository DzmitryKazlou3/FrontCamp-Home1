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
                    'Scripts/Common/Observable.js',

                    'Scripts/Models/Article.js',
                    'Scripts/Models/Articles.js',
                    'Scripts/Models/SourceItem.js',
                    'Scripts/Models/UrlsToLogos.js',

                    'Scripts/Services/SourceService.js',
                    'Scripts/Services/ArticleService.js',

                    'Scripts/Presenters/ArticlesPresenter.js',
                    'Scripts/Presenters/SourcePresenter.js',
                    'Scripts/Presenters/MainPresenter.js',

                    'Scripts/Views/Templates.js',
                    'Scripts/Views/View.js',
                    'Scripts/Views/SourcesView.js',
                    'Scripts/Views/ArticlesView.js',

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
        },

        watch: {
            scripts: {
                files: ['Scripts/*.js', 'Scripts/*/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                }
            },
        }

    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('comb', ['concat']);
    //grunt.registerTask('babel', ['babel']);
};