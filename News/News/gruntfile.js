/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    'Scripts/Common/Urls.js',

                    'Scripts/Models/News.js',
                    'Scripts/Models/NewsItem.js',
                    'Scripts/Models/SourceItem.js',
                    'Scripts/Models/UrlsToLogos.js',

                    'Scripts/Services/SourceService.js',

                    'Scripts/Controllers/SourceController.js',

                    'Scripts/Views/SourcesView.js',

                    'Scripts/app.js'],
                dest: 'Scripts/app-min.js'
            },
        },
       
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('comb', ['concat']);
};